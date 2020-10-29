<template>
  <div class="container">
    <h1 class="title">{{ $t('label.book') }}</h1>
    <div class="columns">
      <div class="column">
        <table-organisms
          :columns="books.columns"
          :rows="books.rows"
          :enabledSearch="true"
          sortKey="title"
          @click="openForm"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column is-narrow">
        <button-atoms :isNarrow="true" type="primary" @clicked="openForm">
          {{ $t('label.register') }}
        </button-atoms>
      </div>
      <div class="column is-narrow">
        <button-atoms :isNarrow="true" type="primary" @clicked="openImportForm">
          {{ $t('label.import') }}
        </button-atoms>
      </div>
    </div>

    <validation-observer v-slot="{ invalid }">
      <modal-organisms v-model="state.isBookFormActive">
        <template #title>
          {{ state.formTitle }}
          <a @click="editForm">
            <span class="icon" v-if="state.isBookFormReadonly">
              <fa icon="edit" />
            </span>
          </a>
        </template>

        <template #body>
          <book-form-organisms
            v-model="state.book"
            :isReadonly="state.isBookFormReadonly"
          />
        </template>

        <template #footer>
          <button-atoms
            @clicked="checkout"
            type="primary"
            v-if="state.isAvailableCheckout && state.isBookFormReadonly"
          >
            {{ state.formCheckoutLabel }}
          </button-atoms>
          <button-atoms
            :disabled="invalid"
            type="primary"
            @clicked="save"
            v-if="!state.isBookFormReadonly"
          >
            {{ state.formSaveLabel }}
          </button-atoms>
          <button-atoms @clicked="closeForm">
            {{ $t('label.cancel') }}
          </button-atoms>
        </template>
      </modal-organisms>
    </validation-observer>

    <validation-observer v-slot="{ invalid }">
      <modal-organisms v-model="state.isBookImportFormActive">
        <template #title>
          {{ state.formTitle }}
        </template>

        <template #body>
          <vue-csv-import
            :autoMatchFields="true"
            buttonClass="button is-info mt-4 is-outlined"
            checkboxClass="checkbox"
            inputClass="input mt-4"
            :loadBtnText="$t(`label.uploadCsv`)"
            :submitBtnText="$t(`label.preview`)"
            tableClass="table is-fullwidth is-striped"
            :map-fields="importHeaders"
            v-model="state.importCsv"
          >
            <template slot="hasHeaders" slot-scope="{ headers, toggle }">
              <label class="checkbox">
                <input
                  type="checkbox"
                  id="hasHeaders"
                  :value="headers"
                  @change="toggle"
                />
                {{ $t('label.hasHeaders') }}
              </label>
            </template>
            <template slot="thead">
              <tr>
                <th>{{ $t('label.item') }}</th>
                <th>{{ $t('label.importBookTheadCsv') }}</th>
              </tr>
            </template>
          </vue-csv-import>
          <div v-if="isAvailableImportPreview">
            <hr />
            <table-organisms
              :columns="books.columns"
              :rows="state.importCsv"
              :enabledSearch="true"
              sortKey="title"
              @click="openForm"
            />
          </div>
        </template>

        <template #footer>
          <button-atoms
            :disabled="invalid || state.importCsv.length === 0"
            type="primary"
            @clicked="importBooks"
          >
            {{ state.formSaveLabel }}
          </button-atoms>
          <button-atoms @clicked="closeImportBookForm">
            {{ $t('label.cancel') }}
          </button-atoms>
        </template>
      </modal-organisms>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useAuthStore } from '@/stores/authStore'
import { useBookStore } from '@/stores/bookStore'
import { BOOK_STATUS } from '@/const'
import { getCheckoutStatus } from '@/utils/labelUtil'
import i18n from '@/lang'

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
  checkoutUserId: number | null
}
type BookCheckoutHistory = {
  id: number | null
  bookId: number
  status: string
}

export default defineComponent({
  setup() {
    const bookStore = useBookStore()
    const authStore = useAuthStore()

    const getInitBook = () => {
      return {
        id: 0,
        title: '',
        author: '',
        publisher: '',
        publishedAt: '',
        description: '',
        status: BOOK_STATUS[0],
        libraryId: authStore.libraryId,
        isbn10: '',
        isbn13: '',
        checkoutUserId: null,
      }
    }
    const state = reactive<{
      book: Book
      // bookCheckoutHistory: BookCheckoutHistory
      importCsv: Book[]
      isAvailableCheckout: boolean
      isAvailableFormCheckout: boolean
      isAvailableBookReturn: boolean
      isBookFormActive: boolean
      isBookFormReadonly: boolean
      isBookImportFormActive: boolean
      isBookImportFormReadonly: boolean
      formTitle: string
      formSaveLabel: string
      formCheckoutLabel: string
    }>({
      book: getInitBook(),
      // bookCheckoutHistory: {},
      importCsv: [],
      isAvailableCheckout: false,
      isAvailableFormCheckout: false,
      isAvailableBookReturn: false,
      isBookFormActive: false,
      isBookFormReadonly: false,
      isBookImportFormActive: false,
      isBookImportFormReadonly: false,
      formTitle: '',
      formSaveLabel: '',
      formCheckoutLabel: '',
    })

    state.book = getInitBook()

    const importHeaders = {
      title: i18n.tc('label.title'),
      author: i18n.tc('label.author'),
      publisher: i18n.tc('label.publisher'),
      publishedAt: i18n.tc('label.publishedAt'),
      description: i18n.tc('label.description'),
      status: i18n.tc('label.status'),
      isbn10: i18n.tc('label.isbn10'),
      isbn13: i18n.tc('label.isbn13'),
    }

    const books = reactive({
      columns: [
        {
          label: i18n.tc('label.title'),
          field: 'title',
          type: 'string',
        },
        {
          label: i18n.tc('label.author'),
          field: 'author',
          type: 'string',
        },
        {
          label: i18n.tc('label.checkoutStatus'),
          field: 'checkoutUserId',
          type: 'string',
          formatFn: getCheckoutStatus,
        },
      ],
      rows: computed(() => {
        return bookStore.list
      }),
    })

    const openForm = (params: Assoc): void => {
      state.isAvailableCheckout = false
      // view
      if (params) {
        const target: Assoc | undefined = bookStore.list.find(
          v => v.id === params.row.id
        )
        if (!target) return
        state.book.id = target.id
        state.book.title = target.title
        state.book.author = target.author
        state.book.publisher = target.publisher
        state.book.description = target.description
        state.book.publishedAt = target.publishedAt
        state.book.isbn10 = target.isbn10
        state.book.isbn13 = target.isbn13
        state.book.status = target.status
        state.book.checkoutUserId = target.checkoutUserId
        state.isBookFormReadonly = true
        state.formTitle = i18n.tc('label.viewBook')
        state.formSaveLabel = i18n.tc('label.update')
        if (state.book.checkoutUserId === authStore.userId) {
          state.formCheckoutLabel = i18n.tc('label.return')
          state.isAvailableCheckout = true
        }
        if (!state.book.checkoutUserId && authStore.userId) {
          state.formCheckoutLabel = i18n.tc('label.checkout')
          state.isAvailableCheckout = true
        }
        // register
      } else {
        state.book = getInitBook()
        state.isBookFormReadonly = false
        state.formTitle = i18n.tc('label.registerBook')
        state.formSaveLabel = i18n.tc('label.register')
      }
      state.isBookFormActive = true
    }
    const editForm = () => {
      state.formTitle = i18n.tc('label.editBook')
      state.isBookFormReadonly = false
    }
    const closeForm = () => {
      state.isBookFormActive = false
    }

    const openImportForm = (): void => {
      state.formTitle = i18n.tc('label.import')
      state.formSaveLabel = i18n.tc('label.import')
      state.isBookImportFormActive = true
      state.importCsv = []
    }
    const closeImportBookForm = (): void => {
      state.isBookImportFormActive = false
    }

    const init = () => {
      closeForm()
      closeImportBookForm()
      bookStore.index()
    }

    const checkout = (): void => {
      // the book is checkouted
      if (state.book.checkoutUserId) {
        state.book.checkoutUserId = null
      } else {
        state.book.checkoutUserId = authStore.userId
      }
      bookStore.checkoutUpdate(state.book).then(() => init())
    }

    const save = (): void => {
      // update
      if (state.book.id) {
        bookStore.update(state.book).then(() => init())
        // register
      } else {
        bookStore.create(state.book).then(() => init())
      }
    }

    const importBooks = (): void => {
      bookStore.importCreate(state.importCsv).then(() => init())
    }

    const isAvailableImportPreview = computed(() => state.importCsv.length > 0)

    init()
    return {
      books,
      checkout,
      closeForm,
      editForm,
      importBooks,
      importHeaders,
      isAvailableImportPreview,
      openForm,
      closeImportBookForm,
      openImportForm,
      save,
      state,
    }
  },
})
</script>
