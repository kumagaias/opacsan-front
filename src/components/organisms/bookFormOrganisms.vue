<template>
  <div class="field">
    <input-atoms
      v-model="state.book.title"
      name="title"
      rules="required"
      :isReadonly="state.isReadonly"
    />
    <input-atoms
      v-model="state.book.author"
      name="author"
      :isReadonly="state.isReadonly"
    />
    <input-atoms
      v-model="state.book.publisher"
      name="publisher"
      :isReadonly="state.isReadonly"
    />
    <input-atoms
      v-model="state.book.description"
      name="description"
      :isReadonly="state.isReadonly"
    />
    <input-atoms
      v-model="state.book.publishedAt"
      name="publishedAt"
      :isReadonly="state.isReadonly"
    />
    <input-atoms
      v-model="state.book.isbn10"
      name="isbn10"
      :isReadonly="state.isReadonly"
    />
    <input-atoms
      v-model="state.book.isbn13"
      name="isbn13"
      :isReadonly="state.isReadonly"
    />
    <!--
    <drop-down-atoms
      v-model="state.book.status"
      name="status"
      :rows="VOLUME_STATUS"
      :rowsFormat="getBookStatus"
      :isReadonly="state.isReadonly"
    />
    -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { VOLUME_STATUS } from '@/const'
import { getBookStatus } from '@/utils/labelUtil'

export default defineComponent({
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, con): object {
    const state = reactive({
      isReadonly: computed(() => props.isReadonly),
      book: computed({
        get: () => props.value,
        set: v => con.emit('input', v),
      }),
    })
    return {
      getBookStatus,
      VOLUME_STATUS,
      state,
    }
  },
})
</script>
