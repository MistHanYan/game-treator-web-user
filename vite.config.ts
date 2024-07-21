import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/auth': {
        target: 'http://mist-home.top:8055',
        changeOrigin: true
      },
      '/users': {
        target: 'http://mist-home.top:8055',
        changeOrigin: true
      },
      '/items': {
        target: 'http://mist-home.top:8055',
        changeOrigin: true
      },
      '/roles': {
        target: 'http://mist-home.top:8055',
        changeOrigin: true
      },
      '/files': {
        target: 'http://mist-home.top:8055',
        changeOrigin: true
      },
      '/assets': {
        target: 'http://mist-home.top:8055',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'image/jpeg, image/png, image/gif, image/jpg'
        },
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
