<template>
  <button :class="componentClass" @click="clicked" :disabled="state.disabled">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, reactive, SetupContext } from '@vue/composition-api'

type Props = {
  disabled: boolean
  isNarrow: boolean
  size: string
  type: string
}

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    isNarrow: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, con: SetupContext): object {
    const clicked = (): void => {
      con.emit('clicked')
    }
    const state = reactive({
      disabled: computed((): boolean => {
        return props.disabled
      }),
    })
    const componentClass = computed(() => {
      return {
        button: true,
        'is-block': true,
        'is-large': props.size === 'large',
        'is-narrow': props.isNarrow,
        'is-fullwidth': true,
        'is-primary': props.type === 'primary',
        'is-outline': props.type === 'secondary',
      }
    })
    return {
      clicked,
      componentClass,
      state,
    }
  },
}
</script>
