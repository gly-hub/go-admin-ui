export enum PermissionTypeEnum {
  MENU = 'M',
  PAGE = 'P',
  BUTTON = 'B',
}
/** 系统权限基础模型 */
export interface SysPermissionBaseModel {
  menu_id?: string
  code: string
  title: string
  menu_type: PermissionTypeEnum
  icon?: string
  permission?: string
}

/** 系统菜单模型 */
export interface SysPermissionModel extends SysPermissionBaseModel {
  children?: SysPermissionModel[]
}
