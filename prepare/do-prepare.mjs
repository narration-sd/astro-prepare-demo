// this will work if we hard-import the scripts
// adds requirement to `astro add`, but not a problematic one

import vuePrepare from './vue-prepare.mjs'

const namedPrepare = (integ, createProper, createArgs, name, isClient) => {
    switch (integ) {
        case 'vue':
            return vuePrepare(createProper, createArgs, name, isClient)
        default:
            throw new Error ('app:do-prepare:Unknown integration: ' + integ)
    }

    // // goes wrong, for the usual linkage reason; non-constant import path not converted
    // return import ('./' + integ + '-prepare.mjs')
    //     .then (properPrepare => {
    //         return properPrepare.default(createProper, createArgs, name, isClient)
    //     })
    //     .catch(err => {
    //         const msg = 'Do we eant to know here:  ' + err
    //         console.log ('Local:' + msg)
    //         throw new Error(msg)
    //     })
}

export default namedPrepare