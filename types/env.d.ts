interface ViteEnv {
  readonly NODE_ENV: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_PORT: number
  readonly VITE_SERVER: string
  readonly VITE_APP_BASE_API: string
}

type ImportMetaEnv = ViteEnv

interface ImportMeta {
  readonly env: ImportMetaEnv
}
