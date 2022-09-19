import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import { vuetifyIntegration } from "./prepare/vue-vuetify-utils.mjs";
// import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // n.b. Order must be followed here: each platform first, then any related integrations
  // this is so the added integration operates against its platform aready configured
  // in the published example, vue(), then vuetifyIntegration()...
  integrations: [ vue({ myOption: 'DO we see?'}), vuetifyIntegration(), /* tailwind(), */  ]
})
