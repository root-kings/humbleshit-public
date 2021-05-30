<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Facility
        <q-btn
          v-close-popup
          round
          flat
          dense
          icon="eva-close-outline"
          class="float-right"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-input
        v-model="dataFactory.name"
        outlined
        label="Facility name"
        lazy-rules
        class="q-mb-md"
      />

      <q-input
        v-model="dataFactory.description"
        outlined
        label="Description"
        type="textarea"
        lazy-rules
        class="q-mb-md"
        autogrow
      />

      <q-list bordered separator class="rounded-borders q-mb-md">
        <q-item
          v-for="parameter in dataFactory.parameters"
          :key="parameter._id"
        >
          <q-checkbox
            v-model="parameter.v"
            :label="parameter.name"
            color="primary"
          />
        </q-item>
      </q-list>

      <!-- <q-list
        bordered
        separator
        v-for="category in dataFactory.groupedParameters"
        :key="category.category"
        class="rounded-borders q-mb-md"
      >
        <q-item-label header>{{ category.category }}</q-item-label>

        <q-item v-for="parameter in category.parameters" :key="parameter._id">
          <q-checkbox
            v-model="parameter.v"
            :label="parameter.name"
            color="primary"
          />
        </q-item>
      </q-list> -->
    </q-card-section>

    <q-card-section class="absolute-bottom">
      <div class="row q-col-gutter-md items-center">
        <!-- <div class="col-auto" v-if="isEdit">
          <q-btn
            class="full-width"
            round
            flat
            icon="eva-trash-2-outline"
            type="submit"
            @click="deleteFacility"
            color="negative"
          />
        </div> -->
        <div class="col">
          <q-btn
            class="full-width"
            rounded
            label="Save"
            type="submit"
            color="primary"
            @click="saveFacility"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import _ from 'lodash'
import { api } from 'boot/axios'

export default {
  props: {
    facility: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['done'],

  data() {
    return {
      step: 1,
      doneGeneral: false,
      doneParameters: false,
      supervisors: [],
      dataFactory: { parameters: [] }
    }
  },

  computed: {
    parameters() {
      return this.$store.getters['parameters/parameters']
    }
  },

  mounted() {
    this.dataFactory = {
      ...this.facility,
      parameters: this.parameters.map(p => ({
        _id: p._id,
        name: p.name,
        v: false
      }))
    }

    // this.dataFactory.groupedParameters = [...this.groupedParameters]

    // this.dataFactory.groupedParameters.forEach(cat => {
    //   cat.parameters = cat.parameters.map(p => ({
    //     _id: p._id,
    //     name: p.name,
    //     v: false
    //   }))
    // })

    this.dataFactory.parameters.forEach(p => (p.v = false))

    if (!this.dataFactory.active) {
      this.dataFactory.active = true
      api
        .put('/facilities/' + this.dataFactory._id + '/activate')
        .then(response => {
          this.$q.notify('Facility activated!')
        })
        .catch(err => {
          console.error(err)
        })
    }
  },

  methods: {
    saveFacility() {
      this.dataFactory.parameters = this.dataFactory.parameters
        .filter(p => p.v)
        .map(p => p._id)

      // this.dataFactory.groupedParameters.forEach(cat => {
      //   cat.parameters.forEach(p => {
      //     this.dataFactory.parameters.push(p._id)
      //   })
      // })

      this.$q.loading.show()
      api
        .put('/facilities/' + this.dataFactory._id, this.dataFactory)
        .then(response => {
          this.$store.dispatch('facilities/fetchFacilities')
          this.$emit('done')
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    getSupervisors() {
      api
        .get('/users/staff')
        .then(response => {
          this.supervisors = response.data.map(user => ({
            value: user._id,
            label: user.name
          }))
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
