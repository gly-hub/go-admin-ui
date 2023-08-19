import { type App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

export function setupElementPlus(app: App) {
  app.use(ElementPlus)
}
