<template>
  <div :class="componentClass">
    <div @click="close" class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="title" />
        </p>
        <button @click="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot name="body" />
      </section>
      <footer class="modal-card-foot">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    isActive: {
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, con): object {
    const componentClass = {
      modal: true,
      'is-active': computed(() => props.value),
    }
    const close = () => {
      con.emit('input', false)
    }
    return {
      close,
      componentClass,
    }
  },
})
</script>
