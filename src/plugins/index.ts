import { type App } from 'vue'
import { setupElementPlus } from './elementplus'

export function setupPlugins(app: App) {
  setupElementPlus(app)
}
