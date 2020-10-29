<template>
  <article :class="componentClass">
    <div class="message-header">
      <p><slot name="title" /></p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      <p><slot name="content" /></p>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  setup(props): object {
    const componentClass = computed(() => {
      return {
        message: true,
        'is-success': props.type === 'success',
      }
    })
    return {
      componentClass,
    }
  },
})
</script>
