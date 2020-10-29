import { inject, provide } from '@vue/composition-api'
import { Assoc } from '@/types/common'

const libSymbol = Symbol()

export default function lib() {
  const storageKey = 'opacsan'
  return {
    load() {
      const storage = localStorage.getItem(storageKey)
      if (storage) {
        return JSON.parse(storage)
      } else {
        return {}
      }
    },
    upload(item: Assoc) {
      localStorage.setItem(storageKey, JSON.stringify(item))
    },
  }
}

export type StorageLib = ReturnType<typeof lib>

export function useStorageLib(): StorageLib {
  const lib: StorageLib | void = inject(libSymbol)
  if (!lib) throw new Error('No storageLib provided.')
  return lib
}

export function provideStorageLib() {
  provide(libSymbol, lib())
}
