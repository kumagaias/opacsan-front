<template>
  <div id="app">
    <header-organisms />
    <router-view />
    <loading-organisms />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onErrorCaptured,
  watch,
} from '@vue/composition-api'
import { provideCommonStore } from '@/stores/commonStore'
import { provideHttpLib, useHttpLib } from '@/lib/httpLib'
import { provideStorageLib, useStorageLib } from '@/lib/storageLib'
import { provideToastLib, useToastLib } from '@/lib/toastLib'
import { provideAuthStore, useAuthStore } from '@/stores/authStore'
import { provideBookStore } from '@/stores/bookStore'
import { provideLibraryStore, useLibraryStore } from '@/stores/libraryStore'
import { provideLibraryUserStore } from '@/stores/libraryUserStore'
import { provideUserStore } from '@/stores/userStore'
import { provideUserActivationStore } from '@/stores/userActivationStore'
import router from '@/router'
import { extend } from 'vee-validate'

export default defineComponent({
  name: 'App',
  setup(prop, con): object {
    provideHttpLib()
    provideStorageLib()
    provideToastLib(con)

    provideAuthStore()
    provideBookStore()
    provideCommonStore()
    provideLibraryStore()
    provideLibraryUserStore()
    provideUserStore()
    provideUserActivationStore()

    const httpLib = useHttpLib()
    const storageLib = useStorageLib()
    const authStore = useAuthStore()
    const libraryStore = useLibraryStore()
    const toastLib = useToastLib()

    onBeforeMount(() => {
      authStore.init(storageLib.load())
    })

    watch(
      () => con.root.$route,
      route => {
        if (!authStore.token && !route.meta.isPublic) {
          router.push('/login')
        }
      },
      { deep: true }
    )

    watch(
      () => authStore,
      authStore => {
        storageLib.upload({
          libraryId: authStore.libraryId,
          libraryName: authStore.libraryName,
          userId: authStore.userId,
          userName: authStore.userName,
          userRole: authStore.userRole,
          token: authStore.token,
        })
        httpLib.interceptors.request.use(config => {
          if (!authStore.token) return config
          config.headers = {
            Authorization: `Token ${authStore.token}`,
            'Content-Type': 'application/json',
            'User-Id': authStore.userId,
            'Library-Id': authStore.libraryId,
          }
          return config
        })
        if (authStore.token) {
          authStore.show()
        }
      },
      { deep: true }
    )

    httpLib.interceptors.response.use(
      res => {
        return res
      },
      err => {
        toastLib.error(err.response.data.code)
        if (err.response.data.code === 'invalidToken') {
          authStore.init()
          router.push('/login')
        }
        return Promise.reject(err)
      }
    )

    onErrorCaptured((err: string): void => {
      // console.log(`ERROR!!!!: ${err}`)
    })

    const validationLibraryNameUnique: any = {
      params: ['name'],
      message: '{name}は既に使用されています。',
      validate(value: string) {
        // console.log(libraryStore.nameShow(name))
        return value !== 'hoge'
      },
    }
    extend('libraryNameUnique', validationLibraryNameUnique)

    return {}
  },
})
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';

// overrite vue-toasted to adjust bulma css
div.toasted {
  padding-top: 1.25em;
  padding-right: 1.5em;
  padding-bottom: 1.25em;
  padding-left: 1.5em;
}
div.toasted-container .toasted {
  margin-top: 0em;
}

// mark require filelds
.required:after {
  content: '*';
  color: red;
}

// title
h1 {
  margin-top: 0.5em;
  padding-left: 0.25em;
  padding-bottom: 0.25em;
  border-left: 6px solid $info;
  border-bottom: 1px solid $info;
}

// delete the borders when readonly
.input:read-only,
.textarea:read-only,
.select select:read-only,
.select:read-only:not(.is-multiple):not(.is-loading)::after {
  border: none;
}
</style>
