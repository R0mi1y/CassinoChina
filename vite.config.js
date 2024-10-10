import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import i18n from 'laravel-vue-i18n/vite';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                base: null,
                includeAbsolute: false
            }
        }),
        i18n(),
        // VitePWA({
        //     registerType: 'autoUpdate',
        //     includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        //     manifest: {
        //         name: 'Minha Aplicação PWA',
        //         short_name: 'AppPWA',
        //         description: 'Descrição da aplicação',
        //         theme_color: '#ffffff',
        //         icons: [
        //             {
        //                 src: 'resources/images/pwa-192x192.png',
        //                 sizes: '192x192',
        //                 type: 'image/png'
        //             },
        //             {
        //                 src: 'resources/images/pwa-512x512.png',
        //                 sizes: '512x512',
        //                 type: 'image/png'
        //             },
        //             {
        //                 src: 'resources/images/pwa-512x512.png',
        //                 sizes: '512x512',
        //                 type: 'image/png',
        //                 purpose: 'maskable'
        //             }
        //         ]
        //     },
        //     workbox: {
        //         maximumFileSizeToCacheInBytes: 4 * 1024 * 1024 // Aumentando o limite para 4 MB
        //     }
        // }),
    ],
    resolve: {
        alias: {
            // Seus aliases aqui, se houver
        }
    },
    define: {
        global: 'window'
    }
});
