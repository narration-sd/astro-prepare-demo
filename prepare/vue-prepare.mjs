// This is the master Prepare script, the foundation for configuring added Vue.use()
// abilities without modification to the Vue integration itself. Thus an Astro app
// can choose and freely add what it may need.

// The needs for this to h appen in the ESBuild/Vite/Rollup environment are quite severe,
// to allow the script to be operable in all phases of deva dn build, thus in Node or the browser.
// Those are all teken care of and demonstrated here, while it's useful to mention a few points;
// probably some more to explain further in documentation

// The first caveat is that if an upgraded Prepare-capable integration is used, then the
// appropriate Prepare script must be present in the projecc/prepare folder. For example,
// /prepare/vue-prepare.mjs, for the Vue integration. This is because the compilation must
// find and use a fixed string path, embedded directly in a dynamic import call, not a
// variable fed to it, in order for the compilers and packagers to locate it for runtimes.
// Much research and proving on this point, as well as many as-sensitive others. The Astro
// environment is far from forgiving, while giving us its privileges

// Integration prepares must be mjs, a second requirement, so that they can be loaded as ES modules,
//
//   For example,  vue-prepare.mjs

// Individual prepares accomplish app.use() addition steps, receiving and returning the
// aggregatted app, which is eventually returned to the Vue integration in any of its
// constructing steps.

// We want very sound exception handling, as again the Astro embeddedd toolsets are not
// very informative or forgiving. This could have been done with try/catch exceptions, but
// it's felt much better to stick with the Promise chain form. That waas originally used
// because of dynamic imports which might have been required; even if they aren't for what
// we are doing (except on the minimally and carefully modified Vue

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'

const { VApp, VMain, VContainer, VRow, VCol, VImg } = components

// prepareTurbo doesn't actually need to be done here, at present; could just replace
// the old different-Turbo integration. The same handling would be used vs. window and presence.
//
// Also, though, there are more capabilities in this Turbo, and to increase before long.
// So it's good enough to keep things here, and work with those extensions after this one.

// we do, however, necessarily pass the app through so chain can use it, untouched in this case.

const prepareTurbo = function (app) {
    return new Promise ((resolve, reject) => {

        // we don't want to multiple-create, per component or page...
        // thus the tricky reason also that we insist on dynamic import(), conditioned here,
        // as import creates it. Window check because build would try it w/o browser

        if (typeof window !== 'undefined'
            && typeof window.Turbo === 'undefined') {
            return import ('@hotwired/turbo')
                .then (result => {
                    return resolve(app)
                })
                .catch(err =>  {
                    const reason = 'import(@hotwired/turbo:failed: ' + err
                    console.log(reason)
                    reject(reason)
                })
        }
        else {
            resolve(app)
        }
    })
}

// Vuetify 3, at a level that includes many features like their unusually injected styles,
// if complete  abiliteis probably not yet tested...though with the fundamental alignments
// provided here, may well not have problems

// There are some special needs of Vuetify 3/Vue 3, such as the v-main and v-app enclosues.
// As the demo app shows, it's fine to put those on the individual components, rather than
// in a top-level app as their instructions imply.

const prepareVuetify =  (app, name) => {

    return new Promise((resolve, reject) => {
            try {
                const vuetify = createVuetify({
                    // components,
                    components: {
                        // *todo* n.b. using this trick saves 200kB zipped over including all components
                        // we'll leave it in for now, at least to simplify investigating build structures.
                        VApp, VMain, VContainer, VRow, VCol, VImg
                    },
                    directives,
                })
                app.use(vuetify)
                resolve(app)
            } catch (err) {
                const reason = 'vuetify prepare failed: ' + err
                console.error(reason)
                reject(reason)
            }
        }
    )
}

// Pinia needs to be Vue.use()ed as a plugin by the Vue initial app,
// while having its own plugins to be Pinia.use()ed internally first.

// Note the fixup for problems with the persist module, in vue-vuetify-integration.mjs and
// its use of prepare-utils.mjs. A pull request hasn't had response, so we fix this ourselves,
// and gain a general solution for such things.

const preparePinia = (app, name)  =>{

    return new Promise((resolve, reject) => {
            try {
                const pinia = createPinia()
                if (typeof window !== 'undefined') {
                    // allow for no SessionStorage, without a browser, as in running dev mode
                    pinia.use(piniaPersist)
                }
                app.use (pinia)
                resolve(app)
            } catch (err) {
                const reason = 'pinia with pinia-plugin-persist failed: ' + err
                console.error(reason)
                reject(reason)
            }
        }
    )
}

// This main `prepare()` method creates and returns the app, once the essentials are in place for it, as
// each of the stages themselves returns the aggregating app.  Mounting still takes place in client.mjs,
// so it can recover to an unprepared basis and still run, if a prepare step fails

// *todo* I'm not completely happy with isClient being needed -- some alternatives to try soon, as
// the createArgs are already being passed. With the solution, we'll likely also handle the name.

const prepare = function (appOnly, name = 'not named', isClient = true) {

    // the first in the chain always gets the fresh appOnly, passing down its result
    // Promises make this level short and simple, also allow inserting logging/comments

    return prepareTurbo(appOnly)
        .then (app => {
            return preparePinia (appOnly, name)
            // *todo* we'll perhaps do uses from a list, after validating on these
        })
        .then (app => {
            return prepareVuetify(app, name)
            // and with this last this time, sans others,, we're done...
        })
        .catch ((err) => {
            console.error ('Prepare failed for: ' + name + ': ' + err)
            return false
        })
}

export { prepare as default }