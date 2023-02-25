<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const path = computed(() => route.path)
</script>

<template>
     <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div v-if="path != '/login'" class="d-flex input-group w-auto">
          <div class="text-white px-4 d-flex">
            <h4>NAV</h4>
          </div>
          <input
            type="search"
            class="form-control"
            placeholder="Search"
          />
          <span class="input-group-text text-black border-0">
            <font-awesome-icon icon="fa-solid fa-search" />
          </span>
          <ul class="navbar-nav mx-4">
            <li class="nav-item">
              <router-link class="nav-link text-white p-2" :to="{ name: 'users.index' }">
                Users
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>