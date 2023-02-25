<template>
  <div class="col-md-6 shadow p-4">
    <div class="d-flex justify-content-between">
      <div>
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
          class="rounded-circle shadow-4"
          style="width: 150px"
          alt="Avatar"
        />
      </div>
      <div>
        <button
          v-if="!createMode"
          :disabled="isLoading"
          class="btn btn-success"
          @click="toggleEditMode"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          {{ editMode ? 'Disable' : 'Enable' }} Editing
        </button>
      </div>
    </div>
    <div class="p-4" v-if="!createMode && !editMode && isLoading">
      <div>
        <p class="p-4">Loading your user information...</p>
      </div>
    </div>
    <div v-else class="form py-4">
      <form @submit.prevent="submitForm">
        <div class="form-floating mb-3">
          <input
            :readonly="(!editMode && !createMode) || isLoading"
            type="email"
            class="form-control"
            id="emailField"
            v-model="userData.email"
          />
          <label for="emailField">Email address:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            :readonly="(!editMode && !createMode) || isLoading"
            type="text"
            class="form-control"
            id="nameInput"
            v-model="userData.name"
          />
          <label for="nameInput">Name:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            :readonly="(!editMode && !createMode) || isLoading"
            type="password"
            class="form-control"
            id="passwordInput"
            v-model="userData.password"
          />
          <label for="passwordInput">Password:</label>
        </div>
        <div class="d-grid">
          <button
            v-if="editMode"
            class="btn btn-primary btn-login text-uppercase fw-bold"
            type="submit"
            :disabled="isLoading"
            @click="sendUser"
          >
            {{ isLoading ? 'Updating...' : 'Update User' }}
          </button>
          <button
            v-if="createMode"
            class="btn btn-primary btn-login text-uppercase fw-bold"
            type="submit"
            :disabled="isLoading"
            @click="sendUser"
          >
            {{ isLoading ? 'Sending...' : 'Create User' }}
          </button>
        </div>
        <hr class="my-4" />
      </form>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import apiService from '@/services/ApiService'
import router from '@/router/index.js'
import { useNotification } from '@kyvg/vue3-notification'

export default {
  setup(props) {
    const route = useRoute()
    const userData = ref({ name: '', email: '', password: '' })
    const editMode = ref(false)
    const createMode = ref(false)
    const isLoading = ref(false)
    const notification = useNotification()

    if (route.name == 'users.create') {
      createMode.value = true
    }

    function toggleEditMode() {
      editMode.value = !editMode.value
    }

    const getUser = async () => {
      isLoading.value = true
      await apiService
        .get(`/users/${route.params.id}`)
        .then((res) => {
          userData.value.name = res.data.name
          userData.value.email = res.data.email
        })
        .catch((err) => {
          console.log(err)
        })

      isLoading.value = false
    }

    const sendUser = async () => {
      isLoading.value = true
      const url = createMode.value ? 'users' : `/users/${route.params.id}`
      await apiService[createMode.value ? 'post' : 'put'](url, userData.value)
        .then((res) => {
          if (createMode) {
            router.push('/users/' + res.data.id)
          }

          notification.notify({
            title: 'User created or updated!',
            type: 'success'
          })
        })
        .catch((err) => {
          notification.notify({
            title: 'Something went wrong!',
            type: 'error'
          })
          console.log(err)
        })

      isLoading.value = false
    }

    // dont load user data if it's create mode
    if (!createMode.value) {
      getUser()
    }

    return {
      userData,
      editMode,
      toggleEditMode,
      createMode,
      sendUser,
      isLoading
    }
  }
}
</script>
