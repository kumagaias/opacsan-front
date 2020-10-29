<template>
  <div class="field">
    <label :class="labelClass">
      {{ $t(`label.${name}`) }}
    </label>
    <div :class="divClass">
      <validation-provider
        :vid="name"
        :name="$t(`label.${name}`)"
        :rules="rules"
        v-slot="{ errors }"
      >
        <input
          :type="type"
          :class="componentClass"
          v-model="state.text"
          :name="name"
          :readonly="state.isReadonly"
        />
        <span>{{ errors[0] }} </span>
      </validation-provider>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  SetupContext,
} from '@vue/composition-api'

type Props = {
  isHorizontal: boolean
  isLoading: boolean
  isReadonly: boolean
  name: string
  size: string
  type: string
  value: string
  rules: string
}

export default defineComponent({
  props: {
    isHorizontal: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, con: SetupContext): object {
    const divClass = {
      control: true,
      'is-large': props.size === 'large',
      'is-loading': computed(() => props.isLoading),
    }
    const labelClass = {
      label: true,
      required: computed(() => {
        return props.rules.indexOf('required') !== -1 && !props.isReadonly
      }),
    }
    const componentClass = {
      input: true,
      'is-large': props.size === 'large',
    }
    const state = reactive<{
      isLoading: ComputedRef<boolean>
      isReadonly: ComputedRef<boolean>
      text: any
      rules: string
    }>({
      isLoading: computed(() => props.isLoading),
      isReadonly: computed(() => props.isReadonly),
      text: computed({
        get: () => props.value,
        set: v => con.emit('input', v),
      }),
      rules: props.rules,
    })
    return {
      componentClass,
      divClass,
      labelClass,
      state,
    }
  },
})
</script>
