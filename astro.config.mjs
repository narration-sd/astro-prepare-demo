import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vuetify from 'vite-plugin-vuetify'
import  { readFile } from 'fs/promises'
import tailwind from '@astrojs/tailwind';

// note that in both uses, this works because arrays are passed by reference in JS
// which puts a kind of funny cast on updateConfig, but where usable, that's clearer,
// while this is careful, and very safe.
function setVuetifyAsNoexternal(vite) {
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

function fixPiniaPersistModuleType (vite) {
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

const ourReportingForMissingPrepares = (vite) => {
  vite.plugins.push(
      {
        async buildEnd(error) {
          if (error) {
            const errs = error.message.split('\n')
            // *todo* of course we'll elaborate...clean suggest of what they are missing & fix
            const ourMessage = 'We\'d rather handle this! ' + errs[0]
            const ourError = new Error (ourMessage)
            ourError.stack = error.stack
            throw ourError
          }
        }
      }
  )
}

// *todo* among many others, note the plugin functions above all go into thie eventual vue upgrade

function vuetifyIntegration (options) {
  return {
    name: 'vuetify',
    hooks: {
      'astro:config:setup': ({ command, config, updateConfig }) => {
        if (command === 'dev' || command === 'build') {
          // though none of this helps the dev with ssr problem, so far
          // console.log('dev, and is there ssr? : ' + JSON.stringify(config.vite.ssr))
          updateConfig ({
            // *todo* if we're going to do this, pass in vue and vuetify options...tbd
            plugins: [vue(), vuetify({autoImport: true})/*, tailwind()*/],
          })
          setVuetifyAsNoexternal(config.vite)
          fixPiniaPersistModuleType(config.vite)
          ourReportingForMissingPrepares(config.vite)
        }
        console.log('ASTRO:config:setup:COMNAND is: ' + command)
        console.log('ASTRO:config:setup:config is: ' + JSON.stringify(config))
      },
      'astro:build:setup': ({ vite, target, updateConfig }) => {
        updateConfig ({
          // *todo* same on args as above...
          plugins: [ vue(), vuetify({autoImport: true})/*, tailwind()*/ ],
        })
        if (target === 'server') {
          setVuetifyAsNoexternal(vite);
          fixPiniaPersistModuleType(vite)
          ourReportingForMissingPrepares(vite)
        }
        console.log ('VITE.build.setup: ' + JSON.stringify(vite.build))
        console.log('VITE.build.setup.TARGET: ' + target)
      },
    },
  }
}

export default defineConfig({
  integrations: [vue(), vuetifyIntegration()/*, tailwind()*/]
})
