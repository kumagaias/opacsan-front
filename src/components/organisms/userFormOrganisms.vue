<template>
  <div class="field">
    <input-atoms
      name="libraryName"
      rules="required|min:4|max:20"
      v-if="user.libraryName != undefined"
      v-model="user.libraryName"
      :isReadonly="state.isReadonly"
      :size="state.size"
    />
    <input-atoms
      name="name"
      rules="min:3|max:20"
      v-if="user.name != undefined"
      v-model="user.name"
      :isReadonly="state.isReadonly"
      :size="state.size"
    />
    <input-atoms
      name="email"
      rules="required|email"
      v-if="user.email != undefined"
      v-model="user.email"
      :isReadonly="state.isReadonly"
      :size="state.size"
    />
    <input-atoms
      name="password"
      rules="required|min:6|max:40"
      type="password"
      v-if="user.password != undefined"
      v-model="user.password"
      :isReadonly="state.isReadonly"
      :size="state.size"
    />
    <input-atoms
      name="passwordConfirm"
      rules="required|min:6|max:40|confirmed:password"
      type="password"
      v-if="user.passwordConfirm != undefined"
      v-model="user.passwordConfirm"
      :isReadonly="state.isReadonly"
      :size="state.size"
    />
    <drop-down-atoms
      name="role"
      rules=""
      v-if="user.role != undefined"
      v-model="user.role"
      :rows="USER_ROLE"
      :rowsFormat="getUserRole"
      :isReadonly="state.isReadonly"
    />
    <drop-down-atoms
      name="status"
      rules=""
      v-if="user.status != undefined"
      v-model="user.status"
      :rows="USER_STATUS"
      :rowsFormat="getUserStatus"
      :isReadonly="state.isReadonly"
    />
    <slot name="button" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { User } from '@/types/common'
import { USER_ROLE, USER_STATUS } from '@/const'
import { getUserRole, getUserStatus } from '@/utils/labelUtil'

type Props = {
  isReadonly: boolean
  size: string
  value: User
}

export default defineComponent({
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal',
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: Props): object {
    const state = reactive({
      isReadonly: computed(() => props.isReadonly),
      size: computed(() => props.size),
    })
    const user: User = props.value
    return {
      getUserRole,
      getUserStatus,
      state,
      user,
      USER_ROLE,
      USER_STATUS,
    }
  },
})
</script>
