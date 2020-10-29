<template>
  <div class="container">
    <h1 class="title">{{ $t('label.users') }}</h1>
    <div class="columns">
      <div class="column">
        <table-organisms
          :columns="users.columns"
          :rows="users.rows"
          :enabledSearch="true"
          sortKey="name"
          @click="openForm"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column is-narrow">
        <button-atoms :isNarrow="true" type="primary" @clicked="openForm">
          {{ $t(`label.inviteUser`) }}
        </button-atoms>
      </div>
    </div>

    <validation-observer v-slot="{ invalid }">
      <modal-organisms v-model="state.isFormActive">
        <template #title>
          {{ state.formTitle }}
        </template>
        <template #body>
          <user-form-organisms
            v-model="user"
            :isReadonly="state.isFormReadonly"
          />
        </template>
        <template #footer>
          <button-atoms
            v-if="!state.isFormReadonly"
            :disabled="invalid"
            type="primary"
            @clicked="invite"
          >
            {{ state.formSaveLabel }}
          </button-atoms>
          <button-atoms v-if="!state.isFormReadonly" @clicked="closeForm">
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
import { useLibraryUserStore } from '@/stores/libraryUserStore'
import { useUserStore } from '@/stores/userStore'
import { USER_ROLE, USER_STATUS } from '@/const'
import { getUserRole, getUserStatus } from '@/utils/labelUtil'
import i18n from '@/lang'

type User = {
  email: string
  name: string | null
  password: string | null
  role: string | null
  status: string | null
}

export default defineComponent({
  setup(): object {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    const libraryUserStore = useLibraryUserStore()

    const state = reactive<{
      isFormActive: boolean
      isFormReadonly: boolean
      formTitle: string
      formSaveLabel: string
    }>({
      isFormActive: false,
      isFormReadonly: false,
      formTitle: '',
      formSaveLabel: '',
    })

    const users = reactive({
      columns: [
        {
          label: i18n.tc('label.name'),
          field: 'name',
          type: 'string',
        },
        {
          label: i18n.tc('label.role'),
          field: 'role',
          type: 'string',
          formatFn: getUserRole,
        },
        {
          label: i18n.tc('label.status'),
          field: 'status',
          type: 'string',
          formatFn: getUserStatus,
        },
      ],
      rows: computed(() => userStore.list),
    })

    const user = reactive<User>({
      email: '',
      name: '',
      password: null,
      role: '',
      status: '',
    })

    const openForm = (params: Assoc): void => {
      // view
      if (params) {
        const target: Assoc | undefined = userStore.list.find(
          (v) => v.id === params.row.id
        )
        if (!target) return
        user.email = target.email
        user.name = target.name
        user.role = target.role
        user.status = target.status
        state.formTitle = i18n.tc('label.viewUser')
        state.formSaveLabel = i18n.tc('label.update')
        state.isFormReadonly = true
        // invite
      } else {
        user.email = ''
        user.name = null
        user.role = null
        user.status = null
        state.formTitle = i18n.tc('label.inviteUser')
        state.formSaveLabel = i18n.tc('label.invite')
        state.isFormReadonly = false
      }
      state.isFormActive = true
    }
    const closeForm = (): void => {
      state.isFormActive = false
    }

    const init = () => {
      closeForm()
      userStore.index()
    }

    const invite = (): void => {
      user.password = '121212'
      user.role = USER_ROLE[0]
      user.status = USER_STATUS[0]
      userStore
        .create(user)
        .then((res: Assoc) => {
          libraryUserStore
            .create({
              userId: res.data.id,
              libraryId: authStore.libraryId,
            })
            .then(() => {
              init()
            })
        })
        .catch((err: Assoc) => {
          console.log(err)
        })
    }

    init()
    return {
      closeForm,
      invite,
      openForm,
      state,
      user,
      users,
    }
  },
})
</script>
