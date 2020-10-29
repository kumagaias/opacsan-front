import { Assoc } from '@/types/common'

export const BOOK_CHECKOUT_HISTORY_STATUS: Assoc = {
  0: 'checkouted',
  1: 'returned',
}

export const BOOK_STATUS: Assoc = {
  0: 'maintenance',
  1: 'available',
  2: 'checkouted',
}

export const USER_ROLE: Assoc = {
  0: 'member',
  1: 'admin',
  2: 'system_admin',
}

export const USER_STATUS: Assoc = {
  0: 'unactivated',
  1: 'valid',
  2: 'stopped',
  3: 'quit',
}

export const VOLUME_STATUS: Assoc = {
  0: 'maintenance',
  1: 'available',
  2: 'checkouted',
}
