<template>
  <q-page padding>
    <q-list bordered separator class="bg-white rounded-borders">
      <q-item
        v-for="link in menuLinks"
        :key="link.link"
        clickable
        :to="link.link"
      >
        <q-item-section avatar>
          <q-icon :name="link.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ link.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list bordered separator class="q-mt-md bg-white rounded-borders">
      <q-item clickable @click="logout">
        <q-item-section avatar>
          <q-icon name="eva-power-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Log out</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageMenu',

  setup() {
    const $store = useStore()
    const $router = useRouter()

    let menuLinks = computed(() => $store.getters['auth/drawerLinks'])

    onMounted(() => {
      $store.dispatch('general/setTitle', 'Menu')
    })

    const logout = () => {
      $store.dispatch('auth/logout')
      $router.replace('/auth/login')
    }

    return {
      menuLinks,
      logout
    }
  }
})
</script>
