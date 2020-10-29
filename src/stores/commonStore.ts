import { inject, provide, reactive } from '@vue/composition-api'

const storeSymbol = Symbol()

export default function commonStore() {
  const state = reactive({
    isLoading: false,
  })
  return {
    get isLoading() {
      return state.isLoading
    },
    set isLoading(isLoading: boolean) {
      state.isLoading = isLoading
    },
  }
}

export type CommonStore = ReturnType<typeof commonStore>

export function useCommonStore(): CommonStore {
  const store: CommonStore | void = inject(storeSymbol)
  if (!store) throw new Error('No CommonStore provided.')
  return store
}

export function provideCommonStore() {
  provide(storeSymbol, commonStore())
}
