import Swup from 'swup'
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupDebugPlugin from '@swup/debug-plugin';

const swup = new Swup({
    // debugMode: true,
    containers: [ /* "#app-top",*/ /* "#myswup", */  "#navslot" ],
    plugins: [
        new SwupDebugPlugin(),
        new SwupScriptsPlugin(  {
        	head: true, // hmm
        	body: true
        } )
    ]
})