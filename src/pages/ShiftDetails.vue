<template>
  <q-page padding>
    <q-card v-if="shift" flat bordered>
      <q-item>
        <q-item-section>
          <q-input
            v-model="shift.startTime"
            outlined
            label="Start Time"
            mask="##:##"
          >
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input
            v-model="shift.endTime"
            outlined
            label="End Time"
            mask="##:##"
          >
          </q-input>
        </q-item-section>
      </q-item>

      <q-list separator>
        <q-item-label header>Mappings</q-item-label>

        <q-separator />

        <q-item v-for="(mapping, idx) in shift.mappings" :key="mapping._id">
          <!-- <q-item-section side>
            <q-checkbox v-model="mapping.active" />
          </q-item-section> -->
          <q-item-section>
            <div class="row q-col-gutter-sm">
              <div class="col-9">
                <q-input
                  v-model="mapping.facility.name"
                  dense
                  outlined
                  label="Facility"
                  type="text"
                  disable
                />
              </div>
              <div class="col-3">
                <q-input
                  v-model="mapping.interval"
                  type="number"
                  dense
                  outlined
                  label="Interval"
                  mask="#"
                  suffix="Hrs"
                />
              </div>

              <div class="col-6">
                <q-select
                  v-model="mapping.supervisor"
                  dense
                  outlined
                  :options="supervisors"
                  emit-value
                  map-options
                  option-label="name"
                  option-value="_id"
                  placeholder="User"
                  label="Supervisor"
                />
              </div>
              <div class="col-6">
                <q-select
                  v-model="mapping.reporter"
                  dense
                  outlined
                  :options="reporters"
                  emit-value
                  map-options
                  option-label="name"
                  option-value="_id"
                  placeholder="User"
                  label="Reporter"
                />
              </div>
            </div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              round
              flat
              dense
              icon="eva-close-outline"
              @click="removeMapping(idx)"
            />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <div class="row">
              <div class="col-9">
                <q-select
                  v-model="newMappingFacilityId"
                  dense
                  outlined
                  :options="filteredFacilities"
                  option-label="name"
                  label="Add Facility"
                />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- TODO -->
    <!-- <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn
        fab
        icon="eva-trash-2-outline"
        color="negative"
        @click="deleteShift"
      />
    </q-page-sticky> -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="eva-save-outline"
        :color="hasChanged ? 'primary' : 'grey'"
        :disable="!hasChanged"
        @click="saveShift"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import _ from 'lodash'
// import moment from 'moment-timezone'
import { api } from 'boot/axios'

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      shift: {
        startTime: null,
        endTime: null,

        mappings: []
      },

      originalShift: null,

      newMappingFacilityId: null
    }
  },

  computed: {
    hasChanged() {
      return !_.isEqual(this.shift, this.originalShift)
    },

    allFacilities() {
      return this.$store.getters['facilities/facilities']
    },

    reporters() {
      return this.$store.getters['users/possibleReporters']
    },

    supervisors() {
      return this.$store.getters['users/possibleSupervisors']
    },

    selectedFacilities() {
      return this.shift.mappings.map(f => f.facility._id)
    },

    filteredFacilities() {
      return this.allFacilities.filter(
        f => !this.selectedFacilities.includes(f._id)
      )
    }
  },

  watch: {
    newMappingFacilityId(val) {
      if (val) {
        this.addMapping(val)
      }
    }
  },

  mounted() {
    this.$store.dispatch('general/setTitle', 'Shift Details')
    this.getShift()

    this.getUsers()
    this.getFacilities()
  },

  methods: {
    async getShift() {
      this.$q.loading.show()
      api
        .get('/shifts/' + this.id)
        .then(response => {
          this.shift = response.data
          this.originalShift = _.cloneDeep(this.shift)
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    getUsers() {
      this.$store.dispatch('users/fetchAllStaff')
    },

    addMapping(facility) {
      this.shift.mappings.push({
        facility,
        supervisor: null,
        reporter: null,
        interval: 2
      })

      this.newMappingFacilityId = null
    },

    removeMapping(index) {
      this.shift.mappings.splice(index, 1)
    },

    getFacilities() {
      this.$store.dispatch('facilities/fetchFacilities')
    },

    saveShift() {
      api
        .put('/shifts/' + this.id, this.shift)
        .then(response => {
          this.getShift()
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    deleteShift() {
      api.delete(`/shifts/${this.id}`).then(res => this.$router.back())
    }
  }
}
</script>
