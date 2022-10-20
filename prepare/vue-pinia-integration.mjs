import {fixEsmModuleType} from "./prepare-utils.js";

// we only need to ameliorate for someone not updating their plugin here, but it's crucial for Astro

const piniaIntegration = (options) => {
    return {
        name: 'pinia',
        hooks: {
            'astro:config:setup': ({ command, config, updateConfig }) => {
                if (command === 'dev') {
                    fixEsmModuleType(config.vite,
                        'pinia-plugin-persist',
                        './node_modules/pinia-plugin-persist//dist/pinia-persist.es.js')
                }
            },
            'astro:build:setup': ({ vite, target, updateConfig }) => {
                if (target === 'server') {
                    fixEsmModuleType(vite,
                        'pinia-plugin-persist',
                        './node_modules/pinia-plugin-persist//dist/pinia-persist.es.js')
                }
            },
        },
    }
}

export { piniaIntegration }