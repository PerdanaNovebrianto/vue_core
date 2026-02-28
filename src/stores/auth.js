import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import constants from '@/utils/constants'
import crypto from 'crypto-js'

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {

  },
  actions: {
    checkAuth() {
      this.user = localStorage.getItem('user') ? JSON.parse(crypto.AES.decrypt(localStorage.getItem('user'), constants.crypto_key).toString(crypto.enc.Utf8)) : null
    },
    async login(payload) {
      let response = await api.post('/login', payload)

      if(response.data.status === true){
        const { user, access_token, refresh_token } = response.data.data

        localStorage.setItem('user', crypto.AES.encrypt(JSON.stringify(user), constants.crypto_key).toString())
        localStorage.setItem('access_token', crypto.AES.encrypt(access_token, constants.crypto_key).toString())
        localStorage.setItem('refresh_token', crypto.AES.encrypt(refresh_token, constants.crypto_key).toString())

        this.user = user
      }
    },
    async logout() {
      await api.post('/logout')

      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      this.resetUser()

      return true
    },
    async resetUser() {
      this.user = null
    }
  },
})