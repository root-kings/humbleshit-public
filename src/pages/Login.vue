<template>
  <q-page padding class="page flex flex-center">
    <q-card>
      <div class="text-center q-pt-md">
        <q-img class="center" width="200px" src="~assets/logo-humbleshit.png" />
      </div>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="phone"
            class="q-my-md"
            outlined
            rounded
            dense
            input-class="text-center"
            type="tel"
            placeholder="PHONE"
            autocomplete="tel"
          >
            <template #prepend>
              <q-icon name="account_circle" />
            </template>
            <template #append>
              <q-icon name="" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            class="q-my-md"
            outlined
            rounded
            dense
            input-class="text-center"
            :type="showPassword ? 'text' : 'password'"
            placeholder="PASSWORD"
            autocomplete="current-password"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordDisplay"
              />
            </template>
          </q-input>

          <div class="row">
            <q-btn
              rounded
              label="login"
              type="submit"
              color="primary"
              class="full-width"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',

  data() {
    return {
      phone: '',
      password: '',
      showPassword: false,

      callback: null
    }
  },

  created() {
    this.callback = this.$route.query.callback
  },

  methods: {
    onSubmit() {
      this.$q.loading.show()

      this.$store
        .dispatch('auth/login', {
          phone: this.phone,
          password: this.password
        })
        .then(response => {
          if (response.status) {
            if (this.callback) this.$router.replace(this.callback)
            else this.$router.replace('/')
          } else {
            // wrong password
            this.$q.notify({
              type: 'negative',
              message: 'wrong password'
            })
          }
        })
        .catch(err => {
          console.error(err)
          this.$q.notify({
            meesage: err.data.message
          })
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    togglePasswordDisplay() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}
</style>
