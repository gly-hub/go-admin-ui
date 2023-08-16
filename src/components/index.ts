import type { App, Component } from 'vue'

// 当组件很多的时候，可以使用
import { SvgIcon } from './SvgIcon'

// 这个地方
const Components: {
  [propName: string]: Component
} = { SvgIcon }

export default {
  install: (app: App) => {
    Object.keys(Components).forEach((key) => {
      app.component(key, Components[key])
    })
  },
}
