import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//引入element
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//路径别名设置
import path from 'path'
//svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//VueSetupExtend 插件
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
  // 端口配置
  server: {
    port: 8888,
    https: false,
    proxy: {
      '^/api': {
        target: 'http://localhost:5173/#/',
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/styles/variable.scss";
        @import "./src/styles/size.scss";
        `,
      },
    },
  },
})
