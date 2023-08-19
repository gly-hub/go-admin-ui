import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      port: Number(env.VITE_APP_PORT),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "./src/assets/style/main.scss" as globalScss;@use "./src/assets/style/element/index.scss" as *;
          `,
        },
      },
    },
  }
})
