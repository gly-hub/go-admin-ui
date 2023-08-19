import type { App, Component } from 'vue'

import { SvgIcon } from '@/components/SvgIcon'
import 'virtual:svg-icons-register'

const Components: {
  [propName: string]: Component
} = { SvgIcon }

export function setupIcon(app: App) {
  Object.keys(Components).forEach((key) => {
    app.component(key, Components[key])
  })
}
