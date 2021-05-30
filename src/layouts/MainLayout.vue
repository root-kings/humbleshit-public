<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-primary text-center">
      <q-toolbar>
        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white">
      <q-tabs
        class="row text-grey"
        active-color="primary"
        switch-indicator
        narrow-indicator
      >
        <q-route-tab
          v-for="link in navigationLinks"
          :key="link.link"
          :name="link.title"
          :to="link.link"
          :icon="link.icon"
          class="col"
          exact
        />

        <q-route-tab
          name="Menu"
          to="/menu"
          icon="eva-menu-outline"
          class="col"
          exact
        />
      </q-tabs>
    </q-footer>
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
    this.checkLogin()
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
