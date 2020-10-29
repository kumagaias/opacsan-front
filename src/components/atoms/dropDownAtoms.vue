<template>
  <div>
    <label :class="labelClass">
      {{ $t(`label.${name}`) }}
    </label>
    <div class="select">
      <select v-model="state.value">
        <option
          v-for="row in state.rows"
          :key="row"
          :selected="row === state.value"
          :value="row"
          v-show="!state.isReadonly || row === state.value"
        >
          {{ format(row) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive, SetupContext } from '@vue/composition-api'

type Props = {
  disabled: boolean
  isReadonly: boolean
  rows: object[]
  rowsFormat: (arg1: string) => string
  value: string
  rules: string
}

export default {
  props: {
    disabled: {
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
    rows: {
      type: Object,
      default: () => ({}),
    },
    rowsFormat: {
      type: Function,
      default: (v: string) => v,
    },
    rules: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, con: SetupContext): object {
    const labelClass = {
      label: true,
      required: computed(() => {
        return props.rules.indexOf('required') !== -1 && !props.isReadonly
      }),
    }
    const state = reactive({
      disabled: computed((): boolean => props.disabled),
      isReadonly: computed((): boolean => props.isReadonly),
      rows: computed((): object[] => props.rows),
      value: computed({
        get: () => props.value || props.rows[0],
        set: v => con.emit('input', v),
      }),
    })
    return {
      format: props.rowsFormat,
      labelClass,
      state,
    }
  },
}
</script>
