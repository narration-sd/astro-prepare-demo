
// the oore of things vite etc. need to operate with vuetify, making use of prepare-utils as required

import {
    setPackagesAsNoExternal,
    fixEsmModuleType,
    addBuildErrorReportingCase,
    addToBuildErrorReporting
} from "./prepare-utils.js";

import viteVuetifyPlugin from 'vite-plugin-vuetify'

const viteVuetifyOptions = { autoImport: true }


function vuetifyIntegration (options) {

    // *todo* this anticipates functionality we intend but don't yet have in `astro add`
    addBuildErrorReportingCase({
        match: /\-prepare/,
        msg: 'For the added-capability Vue integration, you are probably missing, \n' +
            'or have misnamed, your project\'s prepare/vue-prepare.mjs file. \n' +
            'Applying astro add may help by initializing for this requirement: \n'
    })

    return {
        name: 'vuetify',
        hooks: {
            'astro:config:setup': ({ command, config, updateConfig }) => {
                if (command === 'dev') {
                    setPackagesAsNoExternal(config.vite, [ 'vuetify' ]);
                    addToBuildErrorReporting(config.vite)
                }
            },
            'astro:build:setup': ({ vite, target, updateConfig }) => {
                if (target === 'server') {
                    setPackagesAsNoExternal(vite, [ 'vuetify' ]);
                    addToBuildErrorReporting(vite)

                    // next is the required step for build to function, so vite/rollup
                    // will produce Vuetify's css. This is where that plugin goes -- it is
                    // Vite itself we need to influence, not the Vite-Astro integration.
                    vite.plugins.push(viteVuetifyPlugin(viteVuetifyOptions))
                }
            },
        },
    }
}

export { vuetifyIntegration }