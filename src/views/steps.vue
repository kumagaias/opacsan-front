<template>
  <section class="hero is-light is-fullheight">
    <div class="column is-4 is-offset-4"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { useAuthStore } from '@/stores/authStore'
import { useUserActivationStore } from '@/stores/userActivationStore'
import { useToastLib } from '@/lib/toastLib'
import { Assoc } from '@/types/common'
import router from '@/router'

type Props = {
  activationCode: string
  userId: string
}

export default defineComponent({
  props: {
    activationCode: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, con) {
    const authStore = useAuthStore()
    const userActivationStore = useUserActivationStore()
    const toastLib = useToastLib()
    const state = reactive({
      content: '',
      title: '',
      type: 'info',
    })
    if (props.activationCode) {
      userActivationStore
        .update({
          activationCode: props.activationCode,
          userId: props.userId,
        })
        .then((res: Assoc) => {
          authStore.init({
            libraryId: res.data.libraryId,
            libraryName: res.data.libraryName,
            token: res.data.token,
            userId: res.data.userId,
            userName: res.data.userName,
            userRole: res.data.role,
          })
          toastLib.success('userActivation')
          router.push('/books')
        })
        .catch(() => {
          router.push('/login')
        })
    }
    return {
      state,
    }
  },
})
</script>
