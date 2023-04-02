import './bootstrap';
import '../css/app.css';

import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { registerPlugins } from '@/plugins';
// @ts-expect-error
import DefaultLayout from '@/Layouts/Default/DefaultLayout.vue';

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Trace';

createInertiaApp({
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
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        app.use(plugin).use(ZiggyVue, Ziggy);
        registerPlugins(app);
        app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
