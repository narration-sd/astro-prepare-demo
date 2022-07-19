import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
// import vue from './src/integrations/vue/dist/index.js';
// import md from 'integrations/md'
// import turbolinks from "@astrojs/turbolinks";

import { createPinia } from 'pinia'
// import { default as persistPinia } from 'pinia-plugin-persist'
// nuts
// const persistPinia = require('pinia-plugin-persist')
// nuts
// const persistPinia = import ('pinia-plugin-persist')


const preparePinia = function (vueApp) {
  try {
    const pinia = createPinia()
    // pinia.use(persistPinia )
    console.log('PINIA SCRIPT-CREATED: ' + JSON.stringify(pinia))
    vueApp.use(pinia)
  }
  catch (err) {
    console.error ('preparePinia: ' + err)
  }
}

// https://astro.build/config
export default defineConfig({
  // integrations: [vue(), turbolinks(), md()]
  // integrations: [vue(), turbolinks()]
  // integrations: [vue()]
  integrations: [vue({}, [ preparePinia ])]
});
