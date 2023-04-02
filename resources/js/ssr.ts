import { createSSRApp, h, DefineComponent } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { registerPlugins } from '@/plugins';
// @ts-expect-error
import DefaultLayout from '@/Layouts/Default/DefaultLayout.vue';

const appName = 'Trace';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => {
            const page = resolvePageComponent(
                `./Pages/${name}.vue`,
                import.meta.glob<DefineComponent>('./Pages/**/*.vue')
            );

            page.then((module) => {
                module.default.layout = module.default.layout || DefaultLayout;
                // if (name.startsWith('auth.')) module.layout = SimpleLayout;
            });

            return page;
        },
        setup({ App, props, plugin }) {
            var app = createSSRApp({ render: () => h(App, props) });
            app.use(plugin);
            app.use(ZiggyVue, {
                // @ts-expect-error
                ...page.props.ziggy,
                // @ts-expect-error
                location: new URL(page.props.ziggy.location),
            });
            registerPlugins(app);

            return app;
        },
    })
);
