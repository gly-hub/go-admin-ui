import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'virtual:svg-icons-register'
import registerGlobComp from '@/components'
import { setupStore } from '@/store'

async function bootstrap() {
  const app = createApp(App)
  app.use(registerGlobComp)
  app.use(ElementPlus)

  setupStore(app)

  app.mount('#app')
}

bootstrap()
