import { h, createSSRApp, createApp } from 'vue';
import StaticHtml from './static-html.js';
// import Swup from 'swup';
const Swup = require( 'swup' ).default
// console.log('dir base: ' + process.cwd())
// import Swup from 'node_modules/swup/dist/swup.js';
// let Swup //  = require('swup')
console.log ('TYPEOF Swup: ' + typeof Swup)
// import SwupScriptsPlugin from '@swup/scripts-plugin';
// import SwupDebugPlugin from '@swup/debug-plugin';
const SwupScriptsPlugin = require('@swup/scripts-plugin').default;
const SwupDebugPlugin = require('@swup/debug-plugin').default;
let app
export default (element) =>
	(Component, props, children, { client }) => {
		delete props['class'];
		// Expose name on host component for Vue devtools
		const name = Component.name ? `${Component.name} Host` : undefined;
		const slots = {};
		if (children != null) {
			slots.default = () => h(StaticHtml, { value: children });
		}
		if (client === 'only') {
			const app = createApp({ name, render: () => h(Component, props, slots) });
			app.mount(element, false);
		} else {
			const app = createSSRApp({ name, render: () => h(Component, props, slots) });
			app.mount(element, true);
		}
		// try {
		// 	if (app) {
		// 		app.unmount()
		// 		console.log('initialize:app: ' + 'unmounted')
		// 	} else {
		// 		console.log('initialize: no app this time')
		// 	}
		// }
		// catch (e) {
		// 	console.log('app.unmount(): ' + e)
		// }

	let swup;
	if (typeof window !== 'undefined') {
		swup = new Swup({
			// debugMode: true,
			containers: [/* "#astro-root", "#myswup", */ "#navslot"],
			plugins: [
				new SwupDebugPlugin(),
				new SwupScriptsPlugin({
					head: true, // hmm
					body: true
				})]
		});
		// app.use(swup)
		swup.on('contentReplaced', () => {
			// swup.unuse('HeadPlugin');
			// swup.off();
			console.log('contentReplaced:app: ' + app)
			// app.unmount()
			// console.log('contentReplaced:app: ' + 'unmounted')
			// init();
		});
		swup.on('willReplaceContent', () => {
			console.log('willReplaceContent:app: ' + app)
			// app.unmount()
			// console.log('willReplaceContent:app: ' + 'unmounted')
			// this.$destroy();
		});
		console.log('app, just not use-ing swup')
	}

	console.log('narration-sd vue integration created in client')
	// app.mount(element, true);
}
