import Swup from 'swup'
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupDebugPlugin from '@swup/debug-plugin';

let swup = null
if (/*false && */typeof window !== "undefined" && typeof window.swup === "undefined") {
    swup = new Swup({
        // debugMode: true,
        containers: [ /* "#app-top",*/ /* "#myswup", */  "#navslot" ],
        plugins: [
            new SwupDebugPlugin(),
            // new SwupHeadPlugin(),
            new SwupScriptsPlugin(
                {
                // head: true, // hmm
                // body: true
                }
            )
        ]
    })
}
