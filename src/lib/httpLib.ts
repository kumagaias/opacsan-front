import axios from 'axios'
import { AxiosStatic } from 'axios'
import { inject, provide } from '@vue/composition-api'

const libSymbol = Symbol()

export default function lib() {
  const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
  })
  return http
}

export function useHttpLib(): AxiosStatic {
  const http: AxiosStatic | void = inject(libSymbol)
  if (!http) throw new Error('No httpLib provided.')
  return http
}

export function provideHttpLib() {
  provide(libSymbol, lib())
}
