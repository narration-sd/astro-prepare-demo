
// these would be named integration add-on portions, making use of prep-utils as required

import {
    setPackagesAsNoExternal,
    fixEsmModuleType,
    ourReportingForMissingElements
} from "./prepare-utils.js";

import viteVuetifyPlugin from 'vite-plugin-vuetify'

const viteVuetifyOptions = { autoImport: true }

function vuetifyIntegration (options) {
    return {
        name: 'vuetify',
        hooks: {
            'astro:config:setup': ({ command, config, updateConfig }) => {
                if (command === 'dev') {
                    setPackagesAsNoExternal(config.vite, [ 'vuetify' ]);
                    fixEsmModuleType(config.vite,
                        'pinia-plugin-persist',
                        './node_modules/pinia-plugin-persist//dist/pinia-persist.es.js')
                    ourReportingForMissingElements(config.vite)
                }
            },
            'astro:build:setup': ({ vite, target, updateConfig }) => {
                if (target === 'server') {
                    setPackagesAsNoExternal(vite, [ 'vuetify' ]);
                    fixEsmModuleType(vite,
                        'pinia-plugin-persist',
                        './node_modules/pinia-plugin-persist//dist/pinia-persist.es.js')
                    ourReportingForMissingElements(vite)

                    // next is the required step for build to function, so vite/rollup
                    // will produce Vuetify's css. This is where that plugin goes -- it is
                    // Vite itself we need to modify, not the Vite-Astro integration.
                    vite.plugins.push(viteVuetifyPlugin(viteVuetifyOptions))
                }
            },
        },
    }
}

export { vuetifyIntegration }