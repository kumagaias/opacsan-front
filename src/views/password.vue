<template>
  <section class="hero is-fullheight container">
    <div class="hero-body">
      <div class="column is-4 is-offset-4">
        <validation-observer v-slot="{ invalid }">
          <user-form-organisms v-model="user" size="large">
            <template #button>
              <button-atoms
                :disabled="invalid"
                type="primary"
                size="large"
                @clicked="update"
              >
                {{ $t(`label.update`) }}
              </button-atoms>
            </template>
          </user-form-organisms>
        </validation-observer>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { useToastLib } from '@/lib/toastLib'
import { User } from '@/types/common'
import router from '@/router'

export default defineComponent({
  setup(): object {
    const authStore = useAuthStore()

    const user = reactive<User>({
      // id: authStore.userId,
      password: '',
      passwordConfirm: '',
    })

    const userStore = useUserStore()
    const toastLib = useToastLib()
    const update = (): void => {
      userStore.update(user).then(() => {
        toastLib.success('changePasswaord')
        router.push('/')
      })
    }

    return {
      update,
      user,
    }
  },
})
</script>
