import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vuetify from 'vite-plugin-vuetify'
import  { readFile } from 'fs/promises'
import tailwind from '@astrojs/tailwind';

// note that in both uses, this works because arrays are passed by reference in JS
// which puts a kind of funny cast on updateConfig, but where usable, that's clearer,
// while this is careful, and very safe.
function clearVuetify(vite) {
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

function fixPiniaPersist (vite) {
  if (!vite.plugins) {
    vite.plugins = [];
  }

  // we'll fool Vite into believing this is a proper module file

  vite.plugins.push ({
    name: 'fix-pinia-persist',
    enforce: 'pre',
    resolveId(id) {
      if (id.includes('pinia-plugin-persist')) {
        return 'pinia-plugin-persist.mjs'
      }
    },
    async load(id) {
      if (id === 'pinia-plugin-persist.mjs') {
        return await readFile(
            './node_modules/pinia-plugin-persist//dist/pinia-persist.es.js',
            'utf-8',
        )
      }
    }
  })
}

function vuetifyIntegration (options) {
  return {
    name: 'vuetify',
    hooks: {
      'astro:config:setup': ({ command, config, updateConfig }) => {
        console.log('running astro:config:setup...')
        console.log('command  is: ' + command)
        console.log('config is: ' + JSON.stringify(config))
        if (command === 'dev') {
          // though none of this helps the dev with ssr problem, so far
          console.log('dev, and is there ssr? : ' + JSON.stringify(config.vite.ssr))
          updateConfig ({
            // *todo* if we're going to do this, pass in vue and vuetify options...tbd
            plugins: [vue(), vuetify({autoImport: true}), tailwind()],
          })
          clearVuetify(config.vite)
          fixPiniaPersist(config.vite)
        }
      },
      'astro:build:setup': ({ vite, target, updateConfig }) => {
        console.log('astro.config:VITE:TARGET: ' + target)
        updateConfig ({
          // *todo* same on args as above...
          plugins: [ vue(), vuetify({autoImport: true}), tailwind() ],
        })
        console.log ('VITE.build.setup: ' + JSON.stringify(vite.build))
        console.log('VITE.build.setup.target: ' + target)
        if (target === 'server') {
          clearVuetify(vite);
          fixPiniaPersist(vite)
        }
      },
    },
  }
}

export default defineConfig({
  integrations: [vue(), vuetifyIntegration(), tailwind()]
})
