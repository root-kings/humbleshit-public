<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'MainLayout',

  computed: {
    title() {
      return this.$store.getters['general/title']
    },

    token() {
      return this.$store.getters['auth/token']
    },

    navigationLinks() {
      return this.$store.getters['auth/homeLinks']
    }
  },

  created() {
    // this.checkLogin()
  },

  methods: {
    async checkLogin() {
      if (!this.token) return this.logout()

      this.setHeaders()

      try {
        await api.get(process.env.API + '/auth/login/status')
        this.fetchUser()
      } catch (error) {
        console.error(error)
        this.logout()
      }
    },

    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.replace('/auth/login?callback=' + this.$route.path)
    },

    setHeaders() {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
    },

    fetchUser() {
      // TODO
    }
  }
}
</script>
