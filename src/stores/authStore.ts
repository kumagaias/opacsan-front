import { inject, provide, reactive } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useHttpLib } from '@/lib/httpLib'

const storeSymbol = Symbol()

export default function authStore() {
  const httpLib = useHttpLib()
  const state = reactive({
    libraryId: 0,
    libraryName: '',
    userName: '',
    userId: 0,
    userRole: '',
    token: '',
  })
  return {
    get libraryId() {
      return state.libraryId
    },
    get libraryName() {
      return state.libraryName
    },
    get userName() {
      return state.userName
    },
    get userId() {
      return state.userId
    },
    get userRole() {
      return state.userRole
    },
    get token() {
      return state.token
    },
    set libraryId(id) {
      state.libraryId = id
    },
    set userId(id) {
      state.userId = id
    },
    set userRole(role) {
      state.userRole = role
    },
    set token(token) {
      state.token = token
    },
    show() {
      return httpLib.get('/auth')
    },
    create(body: Assoc) {
      return httpLib.post('/auth', { auth: body }).then((res: Assoc) => {
        state.libraryId = res.data.libraryId
        state.libraryName = res.data.libraryName
        state.userName = res.data.name
        state.userId = res.data.id
        state.userRole = res.data.role
        state.token = res.data.token
      })
    },
    delete() {
      return httpLib.delete('/auth').finally(() => {
        this.init()
      })
    },
    init(data: Assoc = {}) {
      if (data) {
        state.libraryId = data.libraryId
        state.libraryName = data.libraryName
        state.userName = data.userName
        state.token = data.token
        state.userId = data.userId
        state.userRole = data.userRole
      } else {
        state.libraryId = 0
        state.libraryName = ''
        state.userName = ''
        state.userId = 0
        state.userRole = ''
        state.token = ''
      }
    },
  }
}

export type AuthStore = ReturnType<typeof authStore>

export function useAuthStore(): AuthStore {
  const store: AuthStore | void = inject(storeSymbol)
  if (!store) throw new Error('No AuthStore provided.')
  return store
}

export function provideAuthStore() {
  provide(storeSymbol, authStore())
}
