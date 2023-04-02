// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../store';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
    loadFonts();
    app.use(vuetify).use(pinia);
}
