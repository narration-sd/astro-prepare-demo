
// these would be named integration add-on portions, making use of prep-utils as required

import {
    default as prepTest,
    setVuetifyAsNoExternal,
    fixPiniaPersistModuleType,
    ourReportingForMissingPrepares
} from "./prep-utils.js";

import viteVuetifyPlugin from 'vite-plugin-vuetify'

const viteVuetifyOptions = { autoImport: true }

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
                    console.log('PRE:ASTRO:config:setup:config:plugins is: ' + JSON.stringify(config.plugins))
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

prepTest('safely here?')

export { vuetifyIntegration }