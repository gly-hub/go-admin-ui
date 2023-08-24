/** 权限设置 */
const permissionSetting = {
  /** 是否鉴权 */
  auth: !import.meta.env.VITE_NOT_PERMISSION,
}

export default permissionSetting
