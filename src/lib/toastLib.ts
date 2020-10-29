import { inject, provide } from '@vue/composition-api'
import lang from '@/lang'

const libSymbol = Symbol()

export default function lib(con: any) {
  const options = {
    position: 'top-center',
    duration: 5000,
    containerClass: ['message'],
    className: ['message-body'],
    theme: 'nothing',
  }
  return {
    error(code: string) {
      options.containerClass.push('is-danger')
      const message = lang.tc(`error.${code}`)
      if (message === `error.${code}`) return
      con.root.$toasted.show(message, options)
    },
    success(code: string) {
      options.containerClass.push('is-success')
      const message = lang.tc(`success.${code}`)
      if (message === `success.${code}`) return
      con.root.$toasted.show(message, options)
    },
  }
}

export type ToastLib = ReturnType<typeof lib>

export function useToastLib() {
  const lib: ToastLib | void = inject(libSymbol)
  if (!lib) throw new Error('No toastLib provided.')
  return lib
}

export function provideToastLib(con: any) {
  provide(libSymbol, lib(con))
}
