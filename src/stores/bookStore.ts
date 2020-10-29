import { inject, provide, reactive } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useHttpLib } from '@/lib/httpLib'

const storeSymbol = Symbol()

type Book = {
  id: number
  title: string
  author: string
  publisher: string
  publishedAt: string
  description: string
  isbn10: string
  isbn13: string
  status: string
  libraryId: number
}

export default function bookStore() {
  const httpLib = useHttpLib()
  const state = reactive<{
    list: Book[]
  }>({
    list: [],
  })

  return {
    get list() {
      return state.list
    },
    index() {
      return httpLib
        .get('/books')
        .then((res: Assoc) => {
          state.list = res.data
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    },
    create(book: Assoc = {}) {
      return httpLib
        .post('/books', { book })
        .then((res: Assoc) => {
          return res.data
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    },
    update(book: Assoc = {}) {
      return httpLib
        .put(`/books/${book.id}`, { book })
        .then((res: Assoc) => {
          return res.data
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    },
    importCreate(books: Book[]) {
      return httpLib
        .post('/books/import', { books })
        .then((res: Assoc) => {
          return res.data
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    },
    checkoutUpdate(book: Book) {
      return httpLib
        .put(`/books/${book.id}/checkout`, { book })
        .then((res: Assoc) => {
          return res.data
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    },
    checkoutHistoryIndex(book: Book) {
      return httpLib
        .put(`/books/${book.id}/checkout_history`, { book })
        .then((res: Assoc) => {
          return res.data
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    },
  }
}

export type BookStore = ReturnType<typeof bookStore>

export function useBookStore(): BookStore {
  const store: BookStore | void = inject(storeSymbol)
  if (!store) throw new Error('No bookStore provided.')
  return store
}

export function provideBookStore() {
  provide(storeSymbol, bookStore())
}
