import { isUrl } from './validate'

/** 处理路径 */
export function getNormalPath(parentPath: string, path: string) {
  if (isUrl(path)) return path
  const childPath = path.startsWith('/') || !path ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/')
}
