import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
// import vue from './src/integrations/vue/dist/index.js';
// import md from 'integrations/md'
// import turbolinks from "@astrojs/turbolinks";

// https://astro.build/config
export default defineConfig({
  // integrations: [vue(), turbolinks(), md()]
  // integrations: [vue(), turbolinks()]
  integrations: [vue()]
});
