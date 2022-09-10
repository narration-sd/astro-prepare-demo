// integration prepares must be mjs, so that they can be loaded by ES-modules,
// which is the form used by Astro and its reliance mainly on Vite and browser
// abilities.

// Prepares will be found if present in the prepare folder. named in the pattern
//   integrationname-prepare.mjs
//
//   For example,  vue-prepare.mjs

// prepares do the creation of the app, so that they can add plugins to it,
// as for vue.use(). Of course, plugins may have their own enhancements,
// shown with the pinia.use() here.

// At present, we're doing @hotwired/turbo setup as well, but this deserves
// to be in its own integration, and will be moved there to supplant the original,
// as this appears to work much more successfully and is on a road to continue
// in its support. Questions there if all of that @hotwired platform ought to be
// in one integration -- this would be cleaner, and allow tracking its coming
// capability releases.

// import {createApp} from "vue";
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
const { VApp, VMain, VContainer, VRow, VCol, VImg } = components
// import { VApp, VMain, VContainer, VRow, VCol, VImg } from 'vuetify/components'
import * as directives from 'vuetify/directives'

const prepareTurbo = function () {
    return new Promise ((resolve, reject) => {

        // we don't want to multiple-create, per component or page...
        // thus the tricky reason also that we insist on dynamic import(), conditioned here,
        // as import creates it. Window check because build would try it w/o browser

        if (typeof window !== 'undefined'
            && typeof window.Turbo === 'undefined') {
            return import ('@hotwired/turbo')
                .then (result => {
                    console.log ('@hotwired/turbo installed')
                    return resolve(result)
                })
                .catch(err =>  {
                    const reason = 'import(@hotwired/turbo:failed: ' + err
                    console.log(reason)
                    reject(reason)
                })
        }
        else {
            resolve()
        }
    })
}

// vuetify, if it will...at least at initial level.
// we have yet to consider their loading of fonts, styles
const prepareVuetify = function (app, name) {

    return new Promise((resolve, reject) => {
            try {
                const vuetify = createVuetify({
                    components: {
                        // *todo* n.b. using this trick saves 200kB zipped over including all components
                        // we'll leave it in for now, at least to simplify investigating build structures.
                        VApp, VMain, VContainer, VRow, VCol, VImg
                    },
                    // components,
                    directives,
                    // theme: {
                    //     themes: {
                    //         JLightTheme: {
                    //             dark: false,
                    //             colors: {
                    //                 background: '#e3e4e0',
                    //                 surface: '#FFFFFF',
                    //                 primary: '#5A392D',
                    //                 'primary-darken-1': '#3700B3',
                    //                 secondary: '#4D5A58',
                    //                 'secondary-darken-1': '#018786',
                    //                 accent: '#e3e4e0',
                    //                 error: '#B00020',
                    //                 info: '#2196F3',
                    //                 success: '#4CAF50',
                    //                 warning: '#FB8C00',
                    //             }
                    //         },
                    //     }
                    // },
                    // // icons: {
                    // //     defaults: 'fa',
                    // //     aliases,
                    // //     sets: {
                    // //         fa,
                    // //         mdi
                    // //     }
                    // // }
                })
                console.log('Vuetify CREATED: ' + JSON.stringify(vuetify))
                /*
                *  *todo* think we are going to have to introduce Vuetify's
                *    v-app and v-main into the picture above the app for this to work.
                *    Which probably means offsetting slots and likely props from their
                *    provided arrays. Which will need to take place in a more special
                *    call to prepareVuetify, which occurs before the creation of the app.
                *    Special handling indeed...without which, big bang about 'weak map keys',
                *    on any v-vuetify-something template use.
                * */
                app.use(vuetify)
                console.log ('vuetify is now in use for: ' + name)
                resolve(app)
            } catch (err) {
                const reason = 'vuetify prepare failed: ' + err
                console.error(reason)
                reject(reason)
            }
        }
    )
}


// Pinia needs to be use()ed as a plugin by the Vue initial app,
// while having its own plugins to be use()ed internally first.
// there are issues here, all handled. The one that can't be
// taken care of is that running in Astro dev somehow upsets
// Turbo enough that though it's there, it simply doesn't run.
const preparePinia = function (app, name) {

    return new Promise((resolve, reject) => {
            try {
                const pinia = createPinia()
                if (typeof window !== 'undefined') {
                    // allow for no SessionStorage, without a browser, as in running dev mode
                    console.log('PINIA INSTALLING persist: ' + (piniaPersist ? true : false))
                    pinia.use(piniaPersist)
                }
                console.log('PINIA CREATED: ' + JSON.stringify(pinia))
                app.use (pinia)
                console.log ('persisted pinia is now in use for: ' + name)
                resolve(app)
            } catch (err) {
                const reason = 'pinia with pinia-plugin-persist failed: ' + err
                console.error(reason)
                reject(reason)
            }
        }
    )
}

// this version creates and returns the app, once the essentials are in place for it
// mounting still takes place in client.mjs, so it can recover to basis if a prepare step fails
const prepare = function (createProper, createArgs, name = 'not named', isClient = true) {

    console.log ('About to prepare for: ' + name)

    return prepareTurbo()
        .then (() => {
            console.log ('prepare creating app for: ' + name)
            const { h, Component, props, slots} = createArgs
            console.log ('props: ' + JSON.stringify(props))
            console.log ('slots: ' + JSON.stringify(slots))

            const app = isClient  // no name for createSSRApp
                ? createProper({ name, render: () => h(Component, props, slots) })
                : createProper({ render: () => h(Component, props, slots) })

            console.log ('created app for: ' + name)
            return app
        })
        .then (app => {
            console.log ('resulting app, un-circularly: ' + app)
            return preparePinia (app, name)
            // *todo* we'll do uses from a list, maybe, after testing on these
        })
        .then (app => {
            console.log('resulting pinia\'d app, un-circularly: ' + app)
            // don't add Vuetify if it's the SSR side -- avoid problems with
            // css duplication being removed by vite css plugin in astro
            console.log ('preparing Vuetify for: ' + name + ': ' + isClient)
            return isClient
                ? prepareVuetify(app, name)
                : app
        })
        .then (app => {
            console.log('resulting vuetified app, un-circularly: ' + app)
            return app
        })
        .catch ((err) => {
            console.error ('Prepare failed for: ' + name + ': ' + err)
            return false
        })
}

export default prepare