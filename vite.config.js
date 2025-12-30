import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig(({ mode }) => {
    const isStaging = mode === 'staging';

    return {
        root: 'app', // use the app/ folder as the dev root (contains index.html)
        base: process.env.PUBLIC_PATH || '/',
        plugins: [
            react({
                include: /\.(mdx|js|jsx|ts|tsx)$/,
                jsxRuntime: 'classic',
            }),
            // Optional: replace webpack offline-plugin + manifest
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['favicon.ico', 'robots.txt', 'images/*'],
                manifest: {
                    name: 'React Boilerplate',
                    short_name: 'React BP',
                    description: 'My React Boilerplate-based project!',
                    background_color: '#fafafa',
                    theme_color: '#b1624d',
                },
            }),
        ],
        resolve: {
            alias: {
                // Mirror webpack resolve of 'app' as root so imports like 'components/..' work
                components: path.resolve(__dirname, 'app/components'),
                containers: path.resolve(__dirname, 'app/containers'),
                utils: path.resolve(__dirname, 'app/utils'),
                images: path.resolve(__dirname, 'app/images'),
                // you can add more as needed
                app: path.resolve(__dirname, 'app'),
            },
        },
        build: {
            sourcemap: isStaging,
            outDir: path.resolve(__dirname, 'build'),
            emptyOutDir: true,
            rollupOptions: {
                output: {
                entryFileNames: isStaging ? 'bundle.js' : 'bundle.[hash].js', // No hash for staging
                chunkFileNames: isStaging ? 'chunk.js' : 'chunk.[hash].js',
                assetFileNames: isStaging ? '[name][ext]' : '[name].[hash][ext]',
                },
            },
        },
    }
});