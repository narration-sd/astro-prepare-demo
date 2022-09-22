// This would ike to be a generic utils module for extending integrationm but
// at the moment still considering on it, as issues commented below are present.
// Thus only the first routine is generic, and multiplexed, the way we'd like.

// n.b. A warning here: this script can't be imported into a named-persist.mjs file,
// and that imported into astro-config-mjs to use their exports. Vite then gets terribly
// confused, apparently because of the crucial-to-us dynamic import over in the relevant
// integration plugin. Can't handle two different kinds of import on same file, looks like.

// Thus, we have our own prepare-utils.mjs, which is probably a better way to go anyway,
// as there is less complication for a helpful `astro add` ro nicely arrange.

import {readFile} from "fs/promises";

const setPackagesAsNoExternal = (vite, packageNames) => {
    if (!vite.ssr) {
        vite.ssr = {};
    }
    if (!vite.ssr.noExternal) {
        vite.ssr.noExternal = [];
    }
    if (Array.isArray(vite.ssr.noExternal)) {
        packageNames.forEach (packageName => {
            vite.ssr.noExternal.push(packageName);
        })
    }
}

// the intention here would have been to make this routine generic and multiple-capable,
// as with setPackagesAsExternal() above.  However, it looks it would get messy, as arguennts
// would have different and specific form depending on what's acctually in the node module.
// It could be done, but let's leave it a custom fix for the moment and see about the balances
// of actual need. The form is shown, if only one or two others need to follow it.

const fixPiniaPersistModuleType = (vite) => {
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

// This routine needs two things: to of course have a proper message, and potentially also
// multiple cases, for things that might turn up with identification that they are not actually
// due to our possibility of a  missing prepare, if it's the case we've seen so far.

// This is then a general method pattern, of intercepting Vite's sometimes quite vague and alarming
// postings when it doesn't see what it needs. The alarming portion is  why we completely form our
// own independent Error, but include the stack from the original, in case it's useful (not so far).

const ourReportingForMissingElements = (vite) => {
    vite.plugins.push(
        {
            async buildEnd(error) {
                if (error) {
                    const errs = error.message.split('\n')
                    // *todo* of course we'll elaborate...clean suggest of what they are missing & fix
                    const ourMessage = 'If developing configuration for Vue, you are probably missing, \n' +
                        'or have misnamed, a Prepare file: \n' + errs[0]
                    const ourError = new Error (ourMessage)
                    ourError.stack = error.stack
                    throw ourError
                }
            }
        }
    )
}

export {
    setPackagesAsNoExternal,
    fixPiniaPersistModuleType,
    ourReportingForMissingElements
}