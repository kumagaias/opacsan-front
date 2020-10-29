import { inject, provide, reactive } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useHttpLib } from '@/lib/httpLib'

const storeSymbol = Symbol()

export default function userStore() {
  const httpLib = useHttpLib()
  const state = reactive<{
    list: Assoc[]
  }>({
    list: [],
  })
  return {
    get list() {
      return state.list
    },
    index() {
      return httpLib.get('/users').then((res: Assoc) => {
        state.list = res.data
      })
    },
    create(user: Assoc) {
      return httpLib.post('/users', { user }).then((res: Assoc) => {
        return res
      })
    },
    update(user: Assoc = {}) {
      return httpLib
        .post(`/users/${user.id}`, { user })
        .then((res: Assoc) => {
          return res.data
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    },
  }
}

export type UserStore = ReturnType<typeof userStore>

export function useUserStore(): UserStore {
  const store: UserStore | void = inject(storeSymbol)
  if (!store) throw new Error('No UserStore provided.')
  return store
}

export function provideUserStore() {
  provide(storeSymbol, userStore())
}
