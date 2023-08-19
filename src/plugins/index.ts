import { type App } from 'vue'
import { setupIcon } from './icon'
import { setupElementPlus } from './elementplus'

export function setupPlugins(app: App) {
  setupElementPlus(app)
  setupIcon(app)
}
