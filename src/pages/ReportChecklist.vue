<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-7">
            <q-input v-model="report.date" standout readonly>
              <template #prepend>
                <q-icon name="eva-calendar-outline" />
              </template>
            </q-input>
          </div>

          <div class="col-5">
            <q-input v-model="report.time" standout readonly>
              <template #prepend>
                <q-icon name="eva-clock-outline" />
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input v-model="report.facility.name" standout readonly>
              <template #prepend>
                <q-icon name="wc" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div
            v-for="param in report.parameters"
            :key="param._id"
            class="col-12"
          >
            <q-btn
              :color="param.statusOk ? 'positive' : 'red-8'"
              no-caps
              :outline="param.statusOk"
              class="rounded-borders full-width"
              align="left"
              @click="toggleParameter(param)"
            >
              <div class="row items-center full-width no-wrap">
                <div class="col-auto">
                  <q-avatar rounded size="48px">
                    <q-img
                      :src="param.img || 'https://placeimg.com/48/48/any'"
                    />
                  </q-avatar>
                </div>
                <div class="col">
                  <div class="q-ml-lg text-weight-regular text-h5" align="left">
                    {{ param.name }}
                  </div>
                </div>

                <div class="col-auto">
                  <q-avatar
                    rounded
                    size="60px"
                    :icon="param.statusOk ? 'check' : 'close'"
                    class="col"
                  />
                </div>
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="eva-arrow-forward-outline"
        color="primary"
        @click="saveReportAndNext"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'PageReportChecklist',

  data() {
    return {
      report: {
        date: null,
        parameters: [],
        facility: {
          name: null
        }
      }
    }
  },

  computed: {
    facility() {
      return this.$store.getters['reports/selectedFacility']
    },

    mapping() {
      return this.$store.getters['reports/selectedMapping']
    }
  },

  mounted() {
    this.$store.dispatch('general/setTitle', 'Checklist')
    this.prepareReport()
  },

  methods: {
    prepareReport() {
      this.report.parameters = this.facility.parameters.map(p => ({
        ...p,
        statusOk: false
      }))

      let now = new moment().tz('Asia/Kolkata')

      this.report.date = now.format('DD MMM YYYY')
      this.report.time = now.format('H:mm A')

      this.report.facility = this.facility
      this.report.reporter = this.mapping.reporter
      this.report.supervisor = this.mapping.supervisor
    },

    toggleParameter(parameter) {
      parameter.statusOk = !parameter.statusOk
    },

    saveReportAndNext() {
      this.$store.dispatch('reports/saveReport', this.report)
      this.$router.push('/reports/details')
    }
  }
}
</script>
