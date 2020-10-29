import { inject, provide } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useHttpLib } from '@/lib/httpLib'

const storeSymbol = Symbol()

export default function libraryUserStore() {
  const httpLib = useHttpLib()
  return {
    create(libraryUser: Assoc) {
      return httpLib
        .post('/library_user', { libraryUser })
        .then((res: Assoc) => {
          return res
        })
    },
  }
}

export type LibraryUserStore = ReturnType<typeof libraryUserStore>

export function useLibraryUserStore(): LibraryUserStore {
  const store: LibraryUserStore | void = inject(storeSymbol)
  if (!store) throw new Error('No LibraryUserStore provided.')
  return store
}

export function provideLibraryUserStore() {
  provide(storeSymbol, libraryUserStore())
}
