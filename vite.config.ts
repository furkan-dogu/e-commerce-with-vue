import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //+ ders 19'da eklendi  
  // build: {
  //   rollupOptions: {
  //     output: {
  //       chunkFileNames: `assets/[name].js`,
  //       entryFileNames: `assets/[name].js`,
  //       assetFileNames: `assets/[name].[ext].js`,
  //     }
  //   }
  // }
})
