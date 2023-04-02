import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// @ts-expect-error
import { createVuetify } from 'vuetify';
// @ts-expect-error
import * as components from 'vuetify/components';
// @ts-expect-error
import * as directives from 'vuetify/directives';
export default createVuetify({
    components,
    directives,
    // ssr: true,
    theme: {
        themes: {
            light: {
                colors: {
                    primary: '#1867C0',
                    secondary: '#5CBBF6',
                },
            },
        },
    },
});
