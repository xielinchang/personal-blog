import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import dts from 'vite-plugin-dts';
import path from 'path';
import DefineOptions from 'unplugin-vue-define-options/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions()],
  build: {
    outDir: 'joyd-design',
    lib: {
      entry: path.resolve(__dirname, './examples/components/main.ts'),
      name: 'JoydDesign',
      fileName: 'joyd-design',
    },
    rollupOptions: {
      external: ['vue'],
      // input: './index.html',
      output: {
        format: 'umd',
        name: 'JoydDemo',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
