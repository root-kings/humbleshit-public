<template>
  <q-page class="flex flex-center bg-white"  padding>
    <div class="column items-center full-width">
      <img
        alt="Status"
        :src="imgSrc"
        width="60%" 
      />

      <q-btn
        v-if="submitState !== 'loading'"
        to="/reports/facilities"
        replace
        rounded
        color="primary"
        label="Back"
        class="q-mt-lg"
        icon="eva-arrow-back-outline"
        no-caps
      />
    </div>
  </q-page>
</template>

<script>
import loadingImg from 'assets/loading.gif'
import successImg from 'assets/success.gif'
import errorImg from 'assets/error.svg'

import { api } from 'boot/axios'


export default {
  data() {
    return {
      submitState: 'loading' // can be 'loading', 'success', 'error',
    }
  },

  computed: {
    imgSrc() {
      if (this.submitState === 'success') {
        return successImg
      } else if (this.submitState === 'error') {
        return errorImg
      } else {
        return loadingImg
      }
    }
    
  },
  mounted() {
    this.$store.dispatch('general/setTitle', 'Submit')
    this.submit()
  },
  methods: {
    submit() {
      let vm = this

      let report = this.$store.getters['reports/report']

      // this.$q.loading.show()
      api
        .post('/reports/submit', report)
        .then(response => {
          this.submitState = response.data.status ? 'success' : 'error'

          setTimeout(() => {
            vm.$router.replace('/reports/facilities')
          }, 5000)
          // this.$store.dispatch('report/setFacility', null)
        })
        .catch(err => {
          this.submitState = 'error'
          // this.$store.dispatch('report/setFacility', null)
          console.error(err)
          this.$q.notify({
            type: 'negative',
            message: 'Errors occured. Try again.'
          })

          this.$router.replace('/reports/details')
        })
        // .finally(() => {
        //   this.$q.loading.hide()
        // })
    }
  }
}
</script>

<style lang="scss" scoped>
.spinning {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


</style>
