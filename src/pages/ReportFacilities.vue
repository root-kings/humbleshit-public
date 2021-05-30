<template>
  <q-page padding>
    <q-list
      v-if="
        userActiveShift &&
        userActiveShift.status == 'started' &&
        facilities.length
      "
      bordered
      separator
      class="bg-white rounded-borders"
    >
      <!-- <q-item
        v-for="facility in facilities"
        :key="facility._id"
        clickable
        @click="startCheckup(facility)"
      > -->
      <q-item v-for="facility in facilities" :key="facility._id" clickable>
        <q-item-section avatar>
          <q-icon
            :name="
              facility.checkStatus === 'done'
                ? 'eva-checkmark-circle-outline'
                : facility.checkStatus === 'doing'
                ? 'eva-clock-outline'
                : 'eva-close-circle-outline'
            "
            :color="
              facility.checkStatus === 'done'
                ? 'positive'
                : facility.checkStatus === 'doing'
                ? 'warning'
                : 'negative'
            "
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ facility.name }}</q-item-label>
          <q-item-label caption>
            {{ $filters.humanDateTime(facility.lastChecked) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="eva-chevron-right-outline" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-card v-else flat bordered>
      <q-card-section>
        <div class="text-center text-grey">
          <q-icon
            name="eva-checkmark-circle-outline"
            size="lg"
            class="q-mb-md"
          />
          <br />
          No facilities to check.
          <br />
          Please start a shift to continue.
        </div>
      </q-card-section>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="eva-sun-outline"
        color="primary"
        no-caps
        @click="startScan"
      >
        <span class="q-mx-sm">Scan</span>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="showScanner">
      <q-card>
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader'

export default {
  name: 'PageReportFacilities',

  components: { QrcodeStream },

  data() {
    return {
      showScanner: false,
      errorMessage: null,
      loading: false
    }
  },

  computed: {
    facilities() {
      return this.$store.getters['reports/facilities']
    },

    userActiveShift() {
      return this.$store.getters['auth/userActiveShift']
    },

    facilityIds() {
      return this.facilities.map(f => f._id)
    }
  },

  mounted() {
    this.$store.dispatch('general/setTitle', 'Check Facilities')
    this.fetchShiftState()
  },

  methods: {
    fetchShiftState() {
      this.$store.dispatch('reports/fetchShiftState')
    },

    startCheckup(facility) {
      if (!facility.checkStatus || facility.checkStatus == 'todo') {
        this.$store.dispatch('reports/startCheckup', facility._id)
        this.$router.push('/reports/checklist')
      } else
        this.$q.notify({
          message: 'This facility does not need checkup.',
          type: 'warning'
        })
    },

    startScan() {
      this.showScanner = true
    },

    onDecode(content) {
      this.showScanner = false

      let facilityId = content.split('facility=')[1]
      let idx = this.facilityIds.indexOf(facilityId)
      if (idx != -1) this.startCheckup(this.facilities[idx])
      else
        this.$q.notify({
          message: 'No such facility.',
          type: 'negative'
        })
    },

    onInit(promise) {
      this.loading = true
      promise
        .then(() => {
          console.log('Successfully initilized! Ready for scanning now!')
          this.loading = false
          this.$forceUpdate()
        })
        .catch(error => {
          if (error.name === 'NotAllowedError') {
            this.errorMessage = 'Hey! I need access to your camera'
          } else if (error.name === 'NotFoundError') {
            this.errorMessage = 'Do you even have a camera on your device?'
          } else if (error.name === 'NotSupportedError') {
            this.errorMessage =
              'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
          } else if (error.name === 'NotReadableError') {
            this.errorMessage =
              "Couldn't access your camera. Is it already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.errorMessage =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?"
          } else {
            this.errorMessage = 'UNKNOWN ERROR: ' + error.message
          }

          this.loading = false

          this.$q.notify({
            message: this.errorMessage,
            type: 'negative'
          })
        })
    }
  }
}
</script>
