<template>
  <div :class="componentClass">
    <div class="modal-background"></div>
    <div class="modal-content">
      <vue-loading
        type="spin"
        color="#ccc"
        :size="{ width: '50px', height: '50px' }"
      ></vue-loading>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useCommonStore } from '@/stores/commonStore'

export default defineComponent({
  setup(): object {
    const commonStore = useCommonStore()
    const componentClass = computed(() => {
      return {
        modal: true,
        'is-active': commonStore.isLoading,
      }
    })
    return {
      componentClass,
    }
  },
})
</script>
