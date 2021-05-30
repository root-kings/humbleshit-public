<template>
  <q-page padding>
    <div v-if="!facility" class="row q-col-gutter-md">
      <div class="col-12">
        <EmptyTile />
      </div>
    </div>

    <q-card v-if="facility" flat bordered>
      <q-card-section>
        <div class="text-h6">{{ facility.name || 'unset' }}</div>
        <div class="text-body1">{{ facility.description || 'unset' }}</div>
      </q-card-section>

      <q-list bordered separator class="overflow-hidden">
        <q-item v-if="facility.lastChecked" v-ripple>
          <q-item-section>
            <q-item-label>Last Checked</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>
              {{ $filters.formatDate(facility.lastChecked) }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item label="Parameters">
          <q-card>
            <q-list>
              <q-item v-for="parameter in facility.parameters" :key="parameter">
                <q-item-section>
                  <q-item-label>{{ parameterNameMap[parameter] }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <!-- TODO -->
    <!-- <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <q-item-label class="text-h6">Issues</q-item-label>
        <q-item-label caption>Reported in last inspection</q-item-label>
      </q-card-section>
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="issue in issues" :key="issue._id">
          <q-item-section>
            <q-item-label>{{ issue.parameter.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="check" color="positive" v-if="issue.statusResolved" />
            <q-icon name="close" color="negative" v-else />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card> -->

    <!-- TODO -->
    <!-- <q-card bordered flat class="q-mt-md">
      <q-card-section>
        <q-item-label class="text-h6">Top Issues</q-item-label>
        <q-item-label caption>Reported over last month</q-item-label>
      </q-card-section>
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="issue in topIssues" :key="issue.name">
          <q-item-section>
            <q-item-label>{{ issue.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ issue.count }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card> -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="eva-edit-outline"
        color="primary"
        @click="facilityDialog = true"
      />
    </q-page-sticky>

    <q-dialog v-model="facilityDialog" maximized persistent>
      <FacilityForm :facility="facility" @done="facilityDialog = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { fetcher } from 'boot/axios'

import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import useSWRV from 'swrv'

import FacilityForm from 'components/FacilityForm'

import EmptyTile from 'components/EmptyTile'

export default defineComponent({
  components: {
    FacilityForm,
    EmptyTile
  },

  setup() {
    const $store = useStore()
    const $route = useRoute()

    let facilityId = $route.params.id

    let { data: issues } = useSWRV(
      '/tickets/by-facility/last?facility=' + facilityId,
      fetcher
    )

    let { data: topIssues } = useSWRV(
      '/tickets/by-facility/top?facility=' + facilityId,
      fetcher
    )

    let facilityDialog = ref(false)
    let facilityScheduleDialog = ref(false)

    let facility = computed(() =>
      $store.getters['facilities/facilityById'](facilityId)
    )

    let parameterNameMap = computed(() => $store.getters['parameters/nameMap'])

    let fetchParameters = () => {
      $store.dispatch('parameters/fetchParameters')
    }

    onMounted(() => {
      $store.dispatch('general/setTitle', 'Facility')
      fetchParameters()
    })

    return {
      issues,
      topIssues,

      facilityDialog,
      facilityScheduleDialog,

      facility,
      parameterNameMap,

      fetchParameters
    }
  }
})
</script>
