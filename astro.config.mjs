import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import { vuetifyIntegration } from "./prepare/vue-vuetify-integration.mjs";
// import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // n.b. Order must be followed here: each platform integration first, then any related integrations
  // This is so the added integration operates against its platform already configured
  // In this published example, vue(), then vuetifyIntegration()...
  integrations: [ vue({ myOption: 'DO we see?'}), vuetifyIntegration(), /* tailwind(), */  ]
})
