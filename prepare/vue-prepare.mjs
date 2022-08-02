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

import {createApp} from "vue";
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { createVuetify } from 'vuetify'

const prepareTurbo = function () {
    return new Promise ((resolve, reject) => {

        // we don't want to multiple-create, per component or page...
        // thus the tricky reason also that we insist on dynamic import(), conditioned here,
        // as import creates it. Window check because build would try it w/o browser

        if (typeof window !== 'undefined'
            && typeof window.Turbo === 'undefined') {
            return import ('@hotwired/turbo')
                .then (() => {
                    console.log ('@hotwired/turbo installed')
                    return resolve()
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
                const vuetify = createVuetify()
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
                console.log('PINIA INSTALLING persist: ' + piniaPersist)
                pinia.use(piniaPersist)
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
const prepare = function (name = 'not named', createArgs) {

    console.log ('About to prepare for: ' + name)

    return prepareTurbo()
        .then (() => {
            console.log ('prepare creating app for: ' + name)
            const { h, Component, props, slots} = createArgs
            const app = createApp({ name, render: () => h(Component, props, slots) })
            console.log ('created app for: ' + name)
            return app
        })
        .then (app => {
            return preparePinia (app, name)
            console.log ('resulting app, un-circularly: ' + app)
            // *todo* we'll do uses from a list, maybe, after testing on these
        })
        .then (app => {
            return prepareVuetify(app, name)
            console.log('resulting app, un-circularly: ' + app)
        })
        .catch ((err) => {
            console.error ('Prepare failed for: ' + name + ': ' + err)
            return false
        })
}

export default prepare