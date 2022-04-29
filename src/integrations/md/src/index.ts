import type { AstroIntegration } from 'astro';

export default function createPlugin(): AstroIntegration {
    return {
        name: 'MD-vue3-markdown-it',
        hooks: {
            'astro:config:setup': ({ injectScript }) => {
                // This gets injected into the user's page, so we need to re-export Turbolinks
                // from our own package so that package managers like pnpm don't get mad and
                // can follow the import correctly.
                injectScript(
                    'page',
                    `import MD from 'vue3-markdown-it';`
                );
            },
        },
    };
}
