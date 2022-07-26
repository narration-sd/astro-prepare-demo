import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// *todo* not  here yet, need to make an Astro integration...
import pkg from 'vite-plugin-pug';
const { pugPlugin } = pkg;

// import prepare from './src/modules/ext-vue-prepare.mjs'

// import vue from './src/integrations/vue/dist/index.js';
// import md from 'integrations/md'
// import turbolinks from "@astrojs/turbolinks";

// this first will work, but w/o persistence
// import { createPinia } from 'pinia'
// import { default as persistPinia } from 'pinia-plugin-persist'
// nuts
// const persistPinia = require('pinia-plugin-persist')
// nuts
// const persistPinia = import ('pinia-plugin-persist')

// and so, no go...
// const preparePinia = function (vueApp) {
//   try {
//     const pinia = createPinia()
//     // pinia.use(persistPinia )
//     console.log('PINIA SCRIPT-CREATED: ' + JSON.stringify(pinia))
//     vueApp.use(pinia)
//   }
//   catch (err) {
//     console.error ('preparePinia: ' + err)
//   }
// }

// here we try functional import to see if it works at right time & location
// doesn't work first time for same reason, but have we an opportunity to use
// a fix based also on promise chaining?
// also basis ok, but doesn't prove yet for actuation later from client.mjs


// import { createPinia } from 'pinia'
// const { createPinia } = import('pinia')
// const piniaPersist = 99 // { piniaPersist } = import ('pinia-plugin-persist')
const preparePinia = function (app) {
    console.log ('initial createPinia: ' + typeof createPinia)
    console.log ('initial piniaPersist: ' + typeof piniaPersist)

  return import('pinia')
  	.then (({ createPinia }) => {
      console.log ('then createPinia: ' + typeof createPinia)
        // const { default:piniaPersist } = import ('pinia-plugin-persist')
        // const piniaPersist = import ('pinia-plugin-persist')
        return [ createPinia, import ('pinia-plugin-persist') ]
        // return [ createPinia, piniaPersist ]
  	})
    .then (([ createPinia, piniaPersist ]) => {
        console.log ('then2 createPinia: ' + typeof createPinia +
            ', piniaPersist: ' + typeof piniaPersist)
        console.log('then2 piniaPersist-strg: ' + JSON.stringify(piniaPersist))
        console.log('then2 piniaPersist: ' + piniaPersist)

  // return Promise.all ([ createPinia, piniaPersist ])
  //   .then ((values) => {
  //       console.log (' values: '+ JSON.stringify(values))
  //       const [ createPinia, piniaPersist ] = values


        const pinia = createPinia()
        pinia.use(piniaPersist)
        console.log('PINIA CREATED: ' + JSON.stringify(pinia))

        console.log ('INSTALLING PlUGIN: ' + JSON.stringify(pinia))
        app.use(pinia)
        console.log ('PINIA INSTALLED: ' + pinia) // becomes circular
    })
    .catch ((err) => {
        console.log ('in addPlugins:err: ' + err)
    })
}

// console.log('runnning config')
// preparePinia() // try first here
// console.log ('trying module prepare...')
// prepare(null, 'up-front test')

// https://astro.build/config
export default defineConfig({
  // integrations: [vue(), turbolinks(), md()]
  // integrations: [vue(), turbolinks()]
  // integrations: [vue()]
    integrations: [vue({}, [ preparePinia ])]
  //   integrations: [vue({}, [ preparePinia ]), pugPlugin()]
});
