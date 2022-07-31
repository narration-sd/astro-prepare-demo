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

const prepareTurbo = function () {
    return new Promise ((resolve, reject) => {

        // we don't want to multiple-create, per component or page...
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

// Pinia needs to be use()ed as a plugin by the Vue initial app,
// while having its own plugins to be use()ed internally first.
// there are issues here, all handled. The one that can't be
// taken care of is that running in Astro dev somehow upsets
// Turbo enough that though it's there, it simply doesn't run.
const preparePinia = function () {

        return new Promise ((resolve, reject) => {
                try {
                    const pinia = createPinia()
                    console.log('PINIA INSTALLING persist: ' + JSON.stringify(piniaPersist))
                    // pinia.use(piniaPersist.default)
                    pinia.use(piniaPersist)
                    console.log('PINIA CREATED: ' + JSON.stringify(pinia))
                    resolve(pinia)
                } catch (err) {
                    const reason = 'pinia with pinia-plugin-persist failed: ' + err
                    console.error(reason)
                    reject(reason)
                }
            }
        )

}

// this version creates and returns the app, once the essentials are in place for it
const prepare = function (name = 'not named', createArgs) {

    console.log ('About to prepare for: ' + name)

    return prepareTurbo()
        .then (() => preparePinia())
        .then (pinia => {
            console.log ('prepare creating app for: ' + name)
            const { h, Component, props, slots} = createArgs
            const app = createApp({ name, render: () => h(Component, props, slots) })
            console.log ('crsated app for: ' + name)
            console.log ('resulting app, uncirularly: ' + app)
            // *todo* we'll do uses from a list, after testing on the one
            // the point being, all is ready before the create, like pinia itself
            app.use (pinia)
            console.log ('persisted pinia is now in use for: ' + name)
            return app
        })
        .catch ((err) => {
            console.error ('Prepare failed for: ' + name + ': ' + err)
            return false
        })
}

export default prepare