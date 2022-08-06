import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vitePluginVuetify from 'vite-plugin-vuetify'

// https://astro.build/config

// export default defineConfig({
//   integrations: [vue(),
//     {
//       name: 'namespace:id',
//       hooks: {
//         'astro:config:done': () => {
//           console.log('running DONE config')
//           return {
//             command: 'dev' | 'build',
//             updateConfig: {
//               vite: {
//                 plugins: [vitePluginVuetify({autoImport: true})],
//               }
//             }
//           }
//         }
//       }
//     },
//   ],
// });

function myIntegration() {
  return {
    name: 'vueify-after-vue',
    hooks: {
      'astro:config:done': () => {
        console.log('running START config')
        return {
          command: 'dev' | 'build',
          config: {
            vite: {
              plugins: [vitePluginVuetify({autoImport: true})],
            }
          }
        }
      }
    }
  }
}

function getViteConfiguration() {
  return {
    optimizeDeps: {
      include: [
        '@astrojs/lit/client-shim.js',
        '@astrojs/lit/hydration-support.js',
        '@webcomponents/template-shadowroot/template-shadowroot.js',
        'lit/experimental-hydrate-support.js',
      ],
      exclude: ['@astrojs/lit/server.js'],
    },
    ssr: {
      external: ['lit-element', '@lit-labs/ssr', '@astrojs/lit'],
    },
  };
}

function vuetifyIntegration (options) {
  return {
    name: 'vuetify',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [vitePluginVuetify({autoImport: true})],
          }
        });
      },
      // 'astro:build:setup': ({ vite, target }) => {
      //   if (target === 'server') {
      //     if (!vite.ssr) {
      //       vite.ssr = {};
      //     }
      //     if (!vite.ssr.noExternal) {
      //       vite.ssr.noExternal = [];
      //     }
      //     if (Array.isArray(vite.ssr.noExternal)) {
      //       vite.ssr.noExternal.push('vuetify');
      //     }
      //   }
      // },
    },
  };
}

export default defineConfig({
  integrations: [vue(), vuetifyIntegration()]
  // integrations: [vue()]
})
