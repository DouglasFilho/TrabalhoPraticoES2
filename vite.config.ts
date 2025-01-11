import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }, // Necessário para processar URLs em componentes Quasar
    }),
    vueDevTools(),
    quasar({
      sassVariables: '@/quasar-variables.sass', // Arquivo de variáveis do Quasar para customização
    }),
  ],
  server: {
    port: 3000, // Porta fixa
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    postcss: '../postcss.config.js', // Certifique-se de apontar para o arquivo de configuração do PostCSS
  },
})
