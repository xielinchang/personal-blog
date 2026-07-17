import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'vue-web-v3'  // ← 添加这行
  },
  server: {
    proxy: {
      '/baidu-api': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baidu-api/, '')
      }
    }
  }
})
