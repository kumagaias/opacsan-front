import { inject, provide } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useHttpLib } from '@/lib/httpLib'

const storeSymbol = Symbol()

export default function userActivationStore() {
  const httpLib = useHttpLib()
  return {
    update(userActivation: Assoc) {
      return httpLib
        .put(
          `/users/${userActivation.userId}/activation/${userActivation.activationCode}`
        )
        .then((res: Assoc) => {
          return res
        })
    },
  }
}

export type userActivationStore = ReturnType<typeof userActivationStore>

export function useUserActivationStore(): userActivationStore {
  const store: userActivationStore | void = inject(storeSymbol)
  if (!store) throw new Error('No UserActivationStore provided.')
  return store
}

export function provideUserActivationStore() {
  provide(storeSymbol, userActivationStore())
}
