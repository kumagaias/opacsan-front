<template>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :search-options="searchOptions"
    :sort-options="sortOptions"
    :pagination-options="{
      enabled: true,
      mode: 'records',
      perPage: 20,
      position: 'bottom',
      perPageDropdown: [20, 50, 100],
      dropdownAllowAll: false,
      setCurrentPage: 1,
      nextLabel: '次',
      prevLabel: '前',
      rowsPerPageLabel: '1 ページあたり',
      ofLabel: 'of',
      pageLabel: 'page', // for 'pages' mode
      allLabel: 'All',
    }"
    @on-row-click="onRowClick"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  props: {
    click: {
      type: String,
      default: '',
    },
    columns: {
      type: Array,
      default: [],
    },
    enabledSearch: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Array,
      default: [],
    },
    sortKey: {
      type: String,
      default: '',
    },
  },
  setup(props, con): object {
    const sortOptions = computed(() => {
      return {
        enabled: true,
        initialSortBy: { field: props.sortKey, type: 'asc' },
      }
    })
    const searchOptions = computed(() => {
      return {
        enabled: props.enabledSearch,
        skipDiacritics: true,
        placeholder: 'Search this table',
      }
    })
    const state = reactive<{
      rows: any[]
      columns: any[]
    }>({
      rows: props.rows,
      columns: props.columns,
    })
    const onRowClick = (params: any) => {
      con.emit('click', params)
    }
    return {
      onRowClick,
      searchOptions,
      sortOptions,
      state,
    }
  },
})
</script>
