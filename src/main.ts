import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupPlugins } from '@/plugins'
import router, { setupRouter } from '@/router'
import { setupGlobCom } from './components'
import { setupRouterGuard } from './router/guard'
import 'uno.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'
import '@/styles/index.scss'

async function bootstrap() {
  const app = createApp(App)

  setupGlobCom(app)
  setupPlugins(app)
  setupStore(app)
  setupRouter(app)
  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
