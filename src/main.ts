import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'virtual:svg-icons-register'
import registerGlobComp from '@/components'

createApp(App).use(registerGlobComp).use(ElementPlus).mount('#app')
