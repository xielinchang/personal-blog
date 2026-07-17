import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: [
  //     {
  //       find: '@joy',
  //       replacement: `${path.resolve(__dirname, '../../examples')}/`,
  //     },
  //   ],
  // },
  plugins: [vueJsx(), DefineOptions()],
  server: {
    port: 3002,
  },
  build: {
    outDir: '../dist', // 输出目录
    //   rollupOptions: {
    //     input: './.vitepress/theme/index.ts', // 入口文件
    //     output: {
    //       name: 'dist',
    //     },
    //   },
    //   sourcemap: true, // 是否生成 sourcemap 文件
    //   minify: 'esbuild', // 使用 esbuild 进行压缩
  },
});
