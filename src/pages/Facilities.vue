<template>
  <q-page padding>
    <q-card bordered flat>
      <q-tabs v-model="tab" narrow-indicator active-color="primary">
        <q-tab name="active" label="Active" />
        <q-tab name="inactive" label="Inactive" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-white text-h5">
        <q-tab-panel name="active" class="q-pa-none">
          <FacilityList :facilities="activeFacilities" />
        </q-tab-panel>

        <q-tab-panel name="inactive" class="q-pa-none">
          <FacilityList :facilities="inactiveFacilities" />

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
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

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
import FacilityList from 'components/FacilityList'
import { QrcodeStream } from 'vue3-qrcode-reader'

import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    FacilityList,
    QrcodeStream
  },

  setup() {
    let tab = ref('active')

    const $store = useStore()
    const $router = useRouter()
    const $q = useQuasar()

    let facilities = computed(() => $store.getters['facilities/facilities'])

    let activeFacilities = computed(
      () => facilities.value.filter(f => f.active) || []
    )

    let inactiveFacilities = computed(
      () => facilities.value.filter(f => !f.active) || []
    )

    let facilityIds = computed(() => facilities.value.map(f => f._id))

    onMounted(() => {
      $store.dispatch('general/setTitle', 'Facilities')
      $store.dispatch('facilities/fetchFacilities')
    })

    let showScanner = ref(false)
    let errorMessage = ref(null)
    let loading = ref(false)

    const startScan = () => {
      showScanner.value = true
    }

    const onDecode = content => {
      showScanner.value = false

      let facilityId = content.split('facility=')[1]
      let idx = facilityIds.value.indexOf(facilityId)
      if (idx != -1) $router.push('/facilities/' + facilityId + '?edit=true')
      else
        $q.notify({
          message: 'No such facility.',
          type: 'negative'
        })
    }

    const onInit = promise => {
      loading.value = true
      promise
        .then(() => {
          console.log('Successfully initilized! Ready for scanning now!')
          loading.value = false
        })
        .catch(error => {
          if (error.name === 'NotAllowedError') {
            errorMessage.value = 'Hey! I need access to your camera'
          } else if (error.name === 'NotFoundError') {
            errorMessage.value = 'Do you even have a camera on your device?'
          } else if (error.name === 'NotSupportedError') {
            errorMessage.value =
              'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
          } else if (error.name === 'NotReadableError') {
            errorMessage.value =
              "Couldn't access your camera. Is it already in use?"
          } else if (error.name === 'OverconstrainedError') {
            errorMessage.value =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?"
          } else {
            errorMessage.value = 'UNKNOWN ERROR: ' + error.message
          }

          loading.value = false

          $q.notify({
            message: errorMessage.value,
            type: 'negative'
          })
        })
    }

    return {
      tab,

      activeFacilities,
      inactiveFacilities,

      startScan,
      showScanner,
      loading,
      onDecode,
      onInit
    }
  }
})
</script>
