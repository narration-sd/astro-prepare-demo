import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import viteVuetifyPlugin from 'vite-plugin-vuetify'
import  { readFile } from 'fs/promises'
// import tailwind from '@astrojs/tailwind';

const viteVuetifyOptions = { autoImport: true }

function setVuetifyAsNoExternal(vite) {
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
            const ourMessage = 'We\'d rather handle this, just saying so for now...! ' + errs[0]
            const ourError = new Error (ourMessage)
            ourError.stack = error.stack
            throw ourError
          }
        }
      }
  )
}

// note that in both uses, this pattern works because arrays are passed by reference in JS
// which puts a kind of funny cast on updateConfig, but where usable, that's clearer,
// while this is careful, and very safe.
// *todo* among many others, note the plugin functions above all go into the eventual vue upgrade

function vuetifyIntegration (options) {
  return {
    name: 'vuetify',
    hooks: {
      'astro:config:setup': ({ command, config, updateConfig }) => {
        if (command === 'dev') {
          // though none of this helps the dev with ssr problem, so far
          console.log('PRE:ASTRO:config:setup:COMNAND is: ' + command)
          console.log('PRE:ASTRO:config:setup:config is: ' + JSON.stringify(config))
          console.log('PRE:ASTRO:config:setup:config.vite.plugins: ' + JSON.stringify(config.vite.plugins))
          // updateConfig ({
          //   // *todo* if we're going to do this, pass in vue and vuetifyPlugin options...tbd
          //   plugins: [ vue() /*, tailwind()*/ ],
          // })
          setVuetifyAsNoExternal(config.vite)
          fixPiniaPersistModuleType(config.vite)
          ourReportingForMissingPrepares(config.vite)
        }
        console.log('POST:ASTRO:config:setup:COMNAND is: ' + command)
        console.log('POST:ASTRO:config:setup:config is: ' + JSON.stringify(config))
        console.log('POST:ASTRO:config:setup:config.vite.plugins: ' + JSON.stringify(config.vite.plugins))
      },
      'astro:build:setup': ({ vite, target, updateConfig }) => {
        console.log('PRE:VITE.build.setup.TARGET: ' + target)
        console.log ('PRE: VITE.build.setup: ' + JSON.stringify(vite))
        console.log ('PRE:VITE.build.setup: ' + JSON.stringify(vite))
        // updateConfig ({
        //   // *todo* same on args as above...
        //   plugins: [ vue()/*, tailwind()*/ ],
        // })
        if (target === 'server') {
          setVuetifyAsNoExternal(vite);
          fixPiniaPersistModuleType(vite)
          ourReportingForMissingPrepares(vite)
          // next is the required step for build to function, so vite/rollup
          // will produce Vuetify's css. This is where that plugin goes.
          vite.plugins.push(viteVuetifyPlugin(viteVuetifyOptions))
        }
        console.log('POST:VITE.build.setup.TARGET: ' + target)
        console.log ('POST:VITE.build.setup: ' + JSON.stringify(vite))
        console.log ('POST:VITE.build.setup:vite.plugins: ' + JSON.stringify(vite.plugins))
      },
    },
  }
}

export default defineConfig({
  // n.b. Order must be followed here: each platform first, then any related integrations
  // this is so the added integration operates against its platform aready configured
  // in the published example, vue(), then vuetifyIntegration()...
  integrations: [ vue(), vuetifyIntegration(), /* tailwind(), */  ]
})
