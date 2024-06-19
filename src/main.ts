import { createApp } from 'vue'
// 引入路由
import router from './Route'
// 引入鉴权
import './permission'
import App from './App.vue'
import './styles/index.scss'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

// 引入icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入pinia仓库
import pinia from './store'
import 'virtual:svg-icons-register'
import { zhCn } from 'element-plus/lib/locale/index.js'
const app = createApp(App)
// 注册icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册路由
app.use(router)
// 注册仓库
app.use(pinia)
//注册ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
})

// 挂载
app.mount('#app')
