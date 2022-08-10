import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
// import vuetify from 'vuetify'
import vuetify from 'vite-plugin-vuetify'

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
      'astro:config:start': () => {
        console.log('running START config')
        return {
          command: 'dev' | 'build',
          config: {
            vite: {
              plugins: [vue(), vuetify({autoImport: true})],
            }
          }
        }
      }
    }
  }
}

// function getViteConfiguration() {
//   return {
//     optimizeDeps: {
//       include: [
//         '@astrojs/lit/client-shim.js',
//         '@astrojs/lit/hydration-support.js',
//         '@webcomponents/template-shadowroot/template-shadowroot.js',
//         'lit/experimental-hydrate-support.js',
//       ],
//       exclude: ['@astrojs/lit/server.js'],
//     },
//     ssr: {
//       external: ['lit-element', '@lit-labs/ssr', '@astrojs/lit'],
//     },
//   };
// }

function vuetifyIntegration (options) {
  return {
    name: 'vuetify',
    hooks: {
      // 'astro:config:setup': ({ updateConfig }) => {
      //   console.log('running astro:config:setup...')
      //   updateConfig ({
      //     vite: {
      //       // can build or dev with autoImport: false. But no vuetify components result
      //       // should be true, but then we have teh build or during-serving-dev crashes.
      //       plugins: [vue(), vuetify({autoImport: true})],
      //       transpile: ['vuetify', 'NsdMicroLogo.vue'],
      //     }
      //   })
      // },
      'astro:build:setup': ({ vite, target, updateConfig }) => {
        // console.log('astro.config:vite:target: ' + target)
        updateConfig ({
          plugins: [ vue(), vuetify({autoImport: true}) ],
          // transpile: ['vuetify', 'NsdMicroLogo.vue'],
        })
        // *todo* not needed, but left to indicate how wwe can hit rollupOptions
        // vite.build.rollupOptions.external = [ "vuetify//components" ]
        console.log ('VITE.build: ' + JSON.stringify(vite.build))
        if (target === 'server') {
          if (!vite.ssr) {
            vite.ssr = {};
          }
          if (!vite.ssr.noExternal) {
            vite.ssr.noExternal = [];
          }
          if (Array.isArray(vite.ssr.noExternal)) {
            vite.ssr.noExternal.push('vuetify');
          }
        }
      },
    },
  }
}

export default defineConfig({
  integrations: [vue(), vuetifyIntegration()]
  // integrations: [vue()]
})
