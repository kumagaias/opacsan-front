import { inject, provide } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useHttpLib } from '@/lib/httpLib'

const storeSymbol = Symbol()

export default function libraryStore() {
  const httpLib = useHttpLib()
  return {
    create(library: Assoc) {
      return httpLib.post('/libraries', { library }).then((res: Assoc) => {
        return res
      })
    },
    nameShow(name: string) {
      return httpLib.get(`/libraries/name/${name}`).then((res: Assoc) => {
        return res
      })
    },
  }
}

export type LibraryStore = ReturnType<typeof libraryStore>

export function useLibraryStore(): LibraryStore {
  const store: LibraryStore | void = inject(storeSymbol)
  if (!store) throw new Error('No libraryStore provided.')
  return store
}

export function provideLibraryStore() {
  provide(storeSymbol, libraryStore())
}
