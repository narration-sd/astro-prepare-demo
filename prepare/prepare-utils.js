// Intent here is to have some generic helpers which can make Prepare scripts feasible
// within the rather tight requirements of ESBuild/Vite//Rolllup.

// A first thought was to interface with lists of tasks, but better if multiple use is
// programmed simply by providing an array of arguments, with [].forEach to apply
// them to the needed utility.

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

// as a utility, fixEsmModuleType is made so it can fit to target module paths, as these
// differ widely for compiled npm modules. The action is to alias the problem file so that
// it looks properly as a module to Vite/Rollup, no matter what may be missing, such as
// proper extension, or lack of "type": "module" in the package.json originally.

const fixEsmModuleType = (vite, matchName, path) => {
    if (!vite.plugins) {
        vite.plugins = [];
    }

    // we'll fool Vite into believing this is a proper module file

    const fixName = 'fix-' + matchName

    vite.plugins.push ({
        name: fixName,
        enforce: 'pre',
        resolveId(id) {
            if (id.includes(matchName)) {
                return fixName + '.mjs'
            }
        },
        async load(id) {
            if (id === fixName + '.mjs') {
                return await readFile(
                    path,
                    'utf-8',
                )
            }
        }
    })
}

// This routine needs two things: to of course have a proper message, and to potentially also
// multiple cases, for things that might turn up with identification that they are not actually
// due to our possibility of a  missing prepare, if it's the case we've seen so far.

// This is then a general method pattern, of intercepting Vite's sometimes quite vague and alarming
// postings when it doesn't see what it needs. The alarming portion is  why we completely form our
// own independent Error, but include the stack from the original, in case it's useful (not mucch so far).

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
    fixEsmModuleType,
    ourReportingForMissingElements
}