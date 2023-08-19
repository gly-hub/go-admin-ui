import { RESEETSTORE } from '@/store/reset'
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/store/modules/user'

const loadingInstance = ElLoading.service
let requestCount = 0
const showLoading = () => {
  requestCount++
  if (requestCount === 1)
    loadingInstance({
      lock: true,
      text: 'loading',
      background: 'rgba(0,0,0,0.5)',
    })
}
const closeLoading = () => {
  requestCount--
  if (requestCount === 0) loadingInstance().close()
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },

  timeout: 10000,
})
//请求拦截

declare module 'axios' {
  interface AxiosRequestConfig {
    loading?: boolean
    isToken?: boolean
  }
  interface InternalAxiosRequestConfig {
    loading?: boolean
    isToken?: boolean
  }
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

const requestMap = new Map()
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const controller = new AbortController()
    const key = config.data + config.url
    config.signal = controller.signal
    if (requestMap.has(key)) {
      requestMap.get(key).abort()
      requestMap.delete(key)
    } else {
      requestMap.set(key, controller)
    }

    const { loading = true, isToken = true } = config

    if (loading) showLoading()
    const userStore = useUserStore()
    const token = userStore.token

    if (token && isToken) {
      console.log(token, isToken)
      config.headers['s-token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    console.log(error)
  },
)

service.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    const { data, config } = res

    const { loading = true } = config
    if (loading) closeLoading()

    if (data.code != 20000) {
      ElMessage({
        message: data.message,
        type: 'error',
      })
      if (data.code === 100001) {
        //登录状态已过期.处理路由重定向
        RESEETSTORE()
        ElMessage.error(data.message || '请求接口错误')
        router.replace('/login')
        return Promise.reject(data)
      }
      throw new Error(data.message)
    }
    return data.data
  },
  (error) => {
    closeLoading()
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({
      message: message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)
export default service
