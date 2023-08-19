import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupPlugins } from '@/plugins'
import { setupRouter } from '@/router'

async function bootstrap() {
  const app = createApp(App)

  setupPlugins(app)
  setupStore(app)
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
