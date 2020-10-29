<template>
  <section class="hero is-fullheight container">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <validation-observer v-slot="{ invalid }">
            <user-form-organisms v-model="user" size="large">
              <template #button>
                <button-atoms
                  :disabled="invalid"
                  type="primary"
                  size="large"
                  @clicked="login"
                >
                  {{ $t(`label.login`) }}
                </button-atoms>
              </template>
            </user-form-organisms>
          </validation-observer>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { useAuthStore } from '@/stores/authStore'
import { getLibraryName } from '@/utils/pathUtil'
import router from '@/router'

export default defineComponent({
  setup(): object {
    const user = reactive({
      libraryName: getLibraryName(location.pathname),
      email: '',
      password: '',
    })

    const authStore = useAuthStore()
    const login = (): void => {
      authStore.create(user).then(() => {
        router.push('/books')
      })
    }

    return {
      login,
      user,
    }
  },
})
</script>
