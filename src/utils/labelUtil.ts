import { USER_ROLE, USER_STATUS, VOLUME_STATUS } from '@/const'
import i18n from '@/lang'

export function getBookStatus(status: string): string {
  switch (status) {
    case VOLUME_STATUS[0]:
      return i18n.tc('const.book.maintenance')
    case VOLUME_STATUS[1]:
      return i18n.tc('const.book.available')
    case VOLUME_STATUS[2]:
      return i18n.tc('const.book.checkout')
    default:
      return ''
  }
}

export function getCheckoutStatus(checkoutUserId: number): string {
  if (checkoutUserId) {
    return i18n.tc('const.book.checkout')
  }
  return i18n.tc('const.book.available')
}

export function getUserRole(role: string): string {
  switch (role) {
    case USER_ROLE[0]:
      return i18n.tc('const.role.member')
    case USER_ROLE[1]:
      return i18n.tc('const.role.admin')
    default:
      return ''
  }
}

export function getUserStatus(status: string): string {
  switch (status) {
    case USER_STATUS[0]:
      return i18n.tc('const.user.unactivated')
    case USER_STATUS[1]:
      return i18n.tc('const.user.activated')
    case USER_STATUS[2]:
      return i18n.tc('const.user.stopped')
    case USER_STATUS[3]:
      return i18n.tc('const.user.quit')
    default:
      return ''
  }
}
