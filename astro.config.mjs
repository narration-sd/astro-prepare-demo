import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import { vuetifyIntegration } from "./prepare/vue-vuetify-integration.mjs";
import { piniaIntegration } from "./prepare/vue-pinia-integration.mjs";
import {addBuildErrorReportingCase} from "./prepare/prepare-utils.js";
// (see below as to why commented out, as this does work of course
// import tailwind from '@astrojs/tailwind';

export default defineConfig({

  // n.b. Order must be followed here: each platform integration first, then any related integrations
  // This is so each added integration operates against its platform already configured
  // In this published example, vue() with its option/s, then vuetifyIntegration()...

  integrations: [
      vue({
    appEntrypoint: '/prepare/vue-prepare', // cleaner with own folder, for more integrations and support modules
  }),
    piniaIntegration(),
    vuetifyIntegration(),
    /*, tailwind(), out because it crushes css Vuetify and others use - it's a one-frame framer */
  ]
})
