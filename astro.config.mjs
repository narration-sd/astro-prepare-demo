import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vuetify from 'vite-plugin-vuetify'

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
            plugins: [vue(), vuetify({autoImport: true})],
          })
          clearVuetify(config.vite)
        }
      },
      'astro:build:setup': ({ vite, target, updateConfig }) => {
        console.log('astro.config:VITE:TARGET: ' + target)
        updateConfig ({
          // *todo* same on args as above...
          plugins: [ vue(), vuetify({autoImport: true}) ],
        })
        console.log ('VITE.build.setup: ' + JSON.stringify(vite.build))
        console.log('VITE.build.setup.target: ' + target)
        if (target === 'server') {
          clearVuetify(vite);
        }
      },
    },
  }
}

export default defineConfig({
  integrations: [vue(), vuetifyIntegration()]
})
