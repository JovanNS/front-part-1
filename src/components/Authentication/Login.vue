<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form @submit.prevent="submitForm">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  v-model="email"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="password"
                />
                <label for="floatingPassword">Password</label>
              </div>

              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="rememberPasswordCheck"
                />
                <label class="form-check-label" for="rememberPasswordCheck">
                  Remember password
                </label>
              </div>
              <div class="d-grid">
                <button
                  :disabled="isLoading"
                  class="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <hr class="my-4" />
              <div class="d-grid mb-2">
                <button
                  :disabled="isLoading"
                  class="btn btn-danger btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  <i class="fab fa-google me-2"></i> Sign in with Google
                </button>
              </div>
              <div class="d-grid">
                <button
                  :disabled="isLoading"
                  class="btn btn-secondary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  <i class="fab fa-facebook-f me-2"></i> Sign in with Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/stores/useAuth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const { login } = useAuth()

    const submitForm = async () => {
      isLoading.value = true
      await login(email.value, password.value)
      isLoading.value = false
    }

    return {
      email,
      password,
      submitForm,
      isLoading
    }
  }
}
</script>
