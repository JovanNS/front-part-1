<template>
  <div>
    <vue-table-lite
      style="flex: 1"
      :is-slot-mode="true"
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      @do-search="doSearch"
      @is-finished="tableLoadingFinish"
    >
      <template v-slot:actions="data">
        <div class="actions-wrapper">
          <a href="" class="btn btn-danger" @click.prevent="deleteEntity(data.value.id)">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </a>
          <router-link
            class="btn btn-success"
            :to="{ name: 'users.show', params: { id: data.value.id } }"
          >
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          </router-link>
        </div>
      </template>
    </vue-table-lite>
  </div>
</template>
<script>
import VueTableLite from 'vue3-table-lite'
import { reactive } from 'vue'
import apiService from '@/services/ApiService.js'
import { useNotification } from '@kyvg/vue3-notification'

export default {
  components: {
    VueTableLite
  },
  props: {
    searchUrl: String,
    entityName: String,
    columnsDef: Array
  },
  setup(props) {
    console.log()
    const entityName = props.entityName

    const table = reactive({
      isLoading: false,
      columns: props.columnsDef,
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: 'id',
        sort: 'asc'
      }
    })

    /**
     * Table search event
     */
    const doSearch = async (offset, limit, order, sort) => {
      table.isLoading = true

      await apiService
        .get(props.searchUrl)
        .then((res) => {
          console.log(res)
          table.rows = res.data
        })
        .catch((err) => console.log(err))

      table.isLoading = false
    }

    /**
     * Table search finished event
     */
    const tableLoadingFinish = (elements) => {
      table.isLoading = false
    }

    // Get data first
    doSearch(0, 10, 'id', 'asc')

    const deleteEntity = async (id) => {
      if (!confirm('Are you sure you want to delete this?')) {
        return
      }

      table.isLoading = true

      await apiService
        .delete(`${props.searchUrl}/${id}`)
        .then((res) => {
          console.log(res)
          table.rows = res.data
        })
        .catch((err) => console.log(err))

      doSearch()
    }

    return {
      table,
      entityName,
      doSearch,
      tableLoadingFinish,
      deleteEntity
    }
  }
}
</script>
<style scoped>
.actions-wrapper {
  text-align: center;
}
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #fff;
  background-color: rgb(33,37,41);
  border-color: #e2f0ea;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
}
::v-deep(.vtl-paging-info) {
  color: rgb(0, 0, 0);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(0, 0, 0);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}
</style>
