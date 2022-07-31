// integration prepares should be mjs, and will be found if present
// in the modules folder. ext-vue-prepare.mjs is the one that the Astro
// vue integration would use. Don't forget install the libraries these
// prepares use into the Astro app's node_modules.
//
// prepares are expected to run after an integration's basis exists,
// but before it is mounted, so that plugins etc. can be added.

// some routines to be run, each with some specialties

// *todo* really, this ought to go in a very simple hotwiredTurbo integration...
// Our first addtion is Hotwired Turbo, so that we get SPA speed pages,
// or could add animations. Just importing Turbo fires it off; if it's not
// tolerant unless in browserland.  Wee do have to await the import(),
// however, without await. As well, Turbo doesn't prefer to be reinitialized
// rapidly, while Astro will try it, so we protect against that, as well.
import {createApp} from "vue";

const prepareTurbo = function () {
    if (typeof window !== 'undefined'
        && typeof window.Turbo === 'undefined') {
        return import ('@hotwired/turbo')
            .then (() => {
                console.log ('@hotwired/turbo installed')
                return true
            })
            .catch(err =>  {
                console.log('import(@hotwired/turbo:failed: ' + err)
                return false
            })
    }
}

// Pinia needs to be use()ed as a plugin by the Vue initial app,
// while having its own plugins to be use()ed internally first.
// there are issues here, all handled. The one that can't be
// taken care of is that running in Astro dev somehow upsets
// Turbo enough that though it's there, it simply doesn't run.
const preparePinia = function () {
    let piniaCreator
    return import('pinia')
        .then (({ createPinia }) => {
            console.log ('then createPinia: ' + typeof createPinia)
            // const { default:piniaPersist } = import ('pinia-plugin-persist')
            // const piniaPersist = import ('pinia-plugin-persist')
            // *todo* messy but necessary; see note just below on array, object altternative
            piniaCreator = createPinia
            return import ('pinia-plugin-persist')
            //
            // // *todo* nota very bene: this will not work, doesn't cause Promise wait
            // //  *todo* on import(). Doing this way passing an object instead of array makes
            // //  *todo* no difference, same problem
            // // return [ import ('pinia-plugin-persist'), createPinia ]
            // return [ import ('pinia-plugin-persist'), createPinia ]
            // // return [ createPinia, piniaPersist ]
        })
        .catch (err => {
            console.log('import(pinia-plugin-persist):failed: ' + err)
            return false
        })
        .then ((piniaPersist) => {
            const createPinia = piniaCreator
            // .then (([ piniaPersist, createPinia ]) => {

            console.log('then2 typeof createPinia: ' + typeof createPinia)
            console.dir(createPinia)
            console.log('then2 typeof piniaPersist: ' + typeof piniaPersist)
            console.log('then2 typeof piniaPersist.default: ' + typeof piniaPersist.default)
            // console.log('then2 piniaPersist-strg: ' + JSON.stringify(piniaPersist))
            console.dir(piniaPersist)
            console.dir(piniaPersist.default)
            // console.log('then2 piniaPersist: ' + piniaPersist)

            // *todo* notes here for explaining how Promise.all does not work
            // and that there are other advantages to the split: that we can
            // individual catch a failed import, and also log to console natures of retunns
            // that this whole thing is a systems-level exercise, so shoudl have
            // the thougthfulness and coverage of error possibilities, not to say
            // discovery for unexpected cases during development or fixing for library
            // changes causing reversions.

            // now, the real problem:
            // something about the nature of import()ed wrong lib types
            // so that piniaPersist.default doesn't work in that case
            // const createPinia = import('pinia')
            // const piniaPersist = import ('pinia-plugin-persist')
            // return Promise.all ([createPinia, piniaPersist])
            //     .then (([ createPinia, piniaPersist ]) => {
            //
            // a checking
            // return Promise.all ([ createPinia, piniaPersist ])
            //   .then ((values) => {
            //       console.log (' values: '+ JSON.stringify(values))
            //       const [ createPinia, piniaPersist ] = values


            const pinia = createPinia()
            console.log('PINIA INSTALLING persist: ' + JSON.stringify(piniaPersist))
            pinia.use(piniaPersist.default)
            console.log('PINIA CREATED: ' + JSON.stringify(pinia))
            return pinia
        })
        .catch (err => {
            console.error('pinia.use pinia-plugin-persist failed: ' + err)
            return null
        })
}

// this version creates and returns the app, once the essentials are in place for it
const prepare = function (name = 'not named', createArgs) {

    console.log ('About to prepare for: ' + name)

    prepareTurbo() // *todo* move back to chain, check chain intermediate catch semantics, use re-throws to unify

    return preparePinia()
        // .then (result => {
        //     return result
        // })
        // .then (() => {
        //     return prepareTurbo()
        // })
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