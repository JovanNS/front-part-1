import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/index.js'
import { notify } from '@kyvg/vue3-notification'
import apiService from "@/services/ApiService";

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    user: null
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await apiService.post('/login', {
          email,
          password
        })
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        this.isAuthenticated = true

        notify({
          title: 'Authorization',
          type: 'success',
          text: 'You have been logged in!'
        })

        router.push('/users')
      } catch (error) {
        notify({
          title: 'Whoops!',
          type: 'error',
          text: 'Something went wrong! Please try again!'
        })
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.isAuthenticated = false
      this.token = null
      this.user = null
    },
    async checkAuthentication() {
      const token = localStorage.getItem('token') || getCookie('token')

      if (token) {
        console.log('here')
          await axios.get('http://localhost:80/api/v1/check/token', {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            this.isAuthenticated = true;
            console.log(this.isAuthenticated)
          }).catch(err => {
            console.error(err, 'dsd')
            this.isAuthenticated = false
          })
      }
    }
  }
})
