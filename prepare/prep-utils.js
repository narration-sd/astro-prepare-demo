// n.b. a warning here: this script can't be imported into a named-persist.mjs file,
// and that imported into astro-config-mjs to use their exports. Vite then gets terribly
// confused, apparently because of the crucial-to-us dyanmic import over in the relevant
// integration plugin. Can't handle two different kinds of import on same file, looks like.

// thus, we have our own prepare-utils.mjs, which is probably a better way to go anyway,
// as there is less complication for a helpful `astro add` ro nicely arrange.

import {readFile} from "fs/promises";

const prepTest = (msg) => {
    console.log('PREPTEST: ' + msg)
}

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


export {
    prepTest as default,
    setVuetifyAsNoExternal,
    fixPiniaPersistModuleType,
    ourReportingForMissingPrepares
}