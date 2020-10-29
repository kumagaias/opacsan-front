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
                @clicked="register"
              >
                {{ $t(`label.signup`) }}
              </button-atoms>
            </template>
          </user-form-organisms>
        </validation-observer>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import { Assoc } from '@/types/common'
import { useUserStore } from '@/stores/userStore'
import { useLibraryStore } from '@/stores/libraryStore'
import { useLibraryUserStore } from '@/stores/libraryUserStore'
import { useToastLib } from '@/lib/toastLib'
import { User } from '@/types/common'
import router from '@/router'

type Props = {
  action: string
}

export default defineComponent({
  props: {
    action: {
      type: String,
      default: '',
    },
  },
  setup(props: Props): object {
    const user = reactive<User>({
      libraryName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    })

    const userStore = useUserStore()
    const libraryStore = useLibraryStore()
    const libraryUserStore = useLibraryUserStore()
    const toastLib = useToastLib()
    const register = (): void => {
      userStore.create(user).then((res: Assoc) => {
        const userId = res.data.id
        libraryStore
          .create({
            name: user.libraryName,
            registerUserId: userId,
          })
          .then((res: Assoc) => {
            const libraryId = res.data.id
            libraryUserStore
              .create({
                userId,
                libraryId,
              })
              .then(() => {
                toastLib.success('sendUserActivationMail')
                router.push('/login')
              })
          })
      })
    }

    watch(
      () => props.action,
      action => {
        console.log(action)
      }
    )

    return {
      props,
      register,
      user,
    }
  },
})
</script>
