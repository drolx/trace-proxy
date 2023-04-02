<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <v-sheet color="grey-lighten-4" class="pa-4">
                <div>xxx</div>
            </v-sheet>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="[icon, text] in links" :key="icon" link>
                    <template #prepend>
                        <v-icon>{{ icon }}</v-icon>
                    </template>
                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Trace Proxy</v-toolbar-title>
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);

const links = [
    ['mdi-inbox-arrow-down', 'Inbox'],
    ['mdi-send', 'Send'],
    ['mdi-delete', 'Trash'],
    ['mdi-alert-octagon', 'Spam'],
];
</script>
