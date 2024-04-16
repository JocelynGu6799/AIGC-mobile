import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { VantResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VueDevTools(),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src'],
     // 组件的有效文件扩展名。
      extensions: ["vue"],
      // 搜索子目录
      deep: true,
      // ui库解析器，也可以自定义
      // resolvers: [VantResolver()],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
      resolvers: [VantResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base:'./'
  // server: {
  //   // http://localhost:5173/api/login -> http://www.test.com/login
  //   proxy: {
  //     //api是自行设置的请求前缀，任何请求路径以/api开头的请求将被代理到对应的target目标
  //     '/generate': {
  //       target:'http://8.149.139.56:8388', //目标域名
  //       changeOrigin: true, //需要代理跨域
  //       // rewrite: (path) => path.replace(/^\/generate/, ''), //路径重写，把'/api'替换为''
  //     },
  //   },
  // },
  // server: {
  //   proxy: {
  //     // 匹配路径规则
  //     '/api': {
  //       // 目标地址
  //       target: 'http://8.149.139.56:8388/',
  //       // 是否重写路径
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       // 是否启用 WebSocket 代理
  //       ws: true,
  //       // 是否跨域
  //       changeOrigin: true,
  //       // 其他选项...
  //     }
  //   }
  // }
  

})
