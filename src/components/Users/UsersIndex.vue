<template>
  <div class="card">
    <h5 class="card-header d-flex justify-content-between">
      Users
      <router-link class="btn btn-success" :to="{ name: 'users.create' }">
        Create User
      </router-link>
    </h5>
    <div class="card-body">
      <table-vue
        search-url="users"
        entity-name="User"
        :columns-def="[
          {
            label: 'ID',
            field: 'id',
            width: '3%',
            sortable: true,
            isKey: true
          },
          {
            label: 'Name',
            field: 'name',
            width: '10%',
            sortable: true
          },
          {
            label: 'Email',
            field: 'email',
            width: '15%',
            sortable: true
          },
          {
            field: 'actions',
            label: 'Actions',
            width: '3%'
          }
        ]"
      ></table-vue>
    </div>
  </div>
</template>

<script>
import TableVue from '../Common/Table.vue'

export default {
  name: 'UsersIndexTable',
  components: {
    TableVue
  },
  setup(props) {}
}
</script>
