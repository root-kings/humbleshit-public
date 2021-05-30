<template>
  <q-page padding>
    <q-card v-if="userDetails" flat bordered class="q-mb-md">
      <q-list separator>
        <q-item>
          <q-item-section v-if="userDetails.img" avatar>
            <q-avatar>
              <q-img :src="userDetails.img" :ratio="1" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ userDetails.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <!-- TODO -->
            <!-- <div class="q-gutter-xs">
                <q-btn
                  flat
                  color="red"
                  round
                  icon="delete"
                  @click="deleteStaff(userDetails.id)"
                />
                <q-btn
                  flat
                  color="primary"
                  round
                  icon="edit"
                  @click="getdataforedit(userDetails)"
                />
              </div> -->
          </q-item-section>
        </q-item>

        <q-item v-if="userDetails.phone">
          <q-item-section>
            <q-item-label caption> Phone </q-item-label>
            <q-item-label>{{ userDetails.phone }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              flat
              color="primary"
              round
              icon="eva-phone-outline"
              type="a"
              :href="`tel:${user.phone}`"
            />
          </q-item-section>
        </q-item>

        <q-item v-if="!!userDetails.reportsTo">
          <q-item-section>
            <q-item-label caption> Reporting Manager </q-item-label>
            <q-item-label>{{ userDetails.reportsTo.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- TODO -->
        <!-- <q-item v-if="user && user.permissions.reportWrite">
          <q-item-section>
            <q-item-label>
              {{ user.shift.start }} - {{ user.shift.end }}
            </q-item-label>

            <q-item-label caption> Shift </q-item-label>
          </q-item-section>
        </q-item> -->
      </q-list>
    </q-card>

    <!-- TODO -->
    <!-- <q-card bordered flat class="q-my-md no-overflow">
      <q-item-label header>Performance</q-item-label>

      <q-card-section class="q-pa-none">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="today" label="Today" />
          <q-tab name="week" label="Week" />
          <q-tab name="month" label="Month" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="today" class="q-pa-none">
            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Issues Reported</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.issueres }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Pending Facilities</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ pendingFacilityDay }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Active Cleaning Hours</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ activeCleanHoursDay }} Hrs</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Active time spent per unit</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.Acttimeperunit }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Utilisation Percentage</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.utipercent }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Average Rating</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.rating }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="week" class="q-pa-none">
            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Issues Reported</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.issueres }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Pending Facilities</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ pendingFacilityWeek }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Active Cleaning Hours</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ activeCleanHoursWeek }} Hrs</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Active time spent per unit</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.Acttimeperunit }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Utilisation Percentage</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.utipercent }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Average Rating</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.rating }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="month" class="q-pa-none">
            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Issues Reported</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.issueres }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Pending Facilities</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ pendingFacilityMonth }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Active Cleaning Hours</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ activeCleanHoursMonth }} Hrs</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Active time spent per unit</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.Acttimeperunit }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Utilisation Percentage</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.utipercent }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Average Rating</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ user.rating }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card> -->

    <!-- TODO -->
    <!-- <q-card class="q-my-md">
      <q-card-section class="q-py-sm">
        <q-item-label class="text-h6">Shifts</q-item-label>
      </q-card-section>

    </q-card> -->

    <!-- TODO -->
    <!-- <q-card class="q-my-md q-mb-xl">
      <q-card-section class="q-py-sm">
        <div class="text-h6">Other</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section>
              Total no. of reported issues reported since joining
            </q-item-section>
            <q-item-section side>2 issues</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card> -->

    <!-- TODO: Edit and Delete -->
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
    </q-page-sticky> -->

    <!-- <q-dialog v-model="dialog" :position="position">
      <q-card class="full-width">
        <q-card-section class>
          <q-input
            outlined
            dense
            v-model="user.name"
            label="Name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            outlined
            dense
            v-model="user.phone"
            label="Phone"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your phone number'
            ]"
            mask="(###) ### - ####"
          />

          
          <q-btn label="Save" @click="onEdit" color="primary" />
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>

<script>
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
      tab: 'today',
      facilities: [],
      userDetails: null,
      user: {
        reportsTo: null,
        shift: {
          start: null,
          end: null
        },
        permissions: {}
      },
      isuues: [],
      dialog: false,
      activeCleanHoursDay: null,
      activeCleanHoursWeek: null,
      activeCleanHoursMonth: null,
      pendingFacility: null,
      position: 'bottom',
      name: null,
      phone: null
    }
  },
  computed: {
    pendingFacilityDay: function () {
      return this.pendingFacility * 1
    },

    pendingFacilityWeek: function () {
      return this.pendingFacility * 7
    },

    pendingFacilityMonth: function () {
      return this.pendingFacility * 30
    }
  },
  mounted() {
    this.$store.dispatch('general/setTitle', 'Staff Profile')
    this.getUser()
    this.getUserFacilities()
    this.getUserPerformance()
  },
  methods: {
    getUser() {
      this.$q.loading.show()
      api
        .get('/users/details/' + this.id)
        .then(response => {
          this.userDetails = response.data
          console.log(this.userDetails)
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    getUserPerformance() {
      this.$q.loading.show()
      api
        .get(
          process.env.API +
            '/stats/janitor/day/active-time-total?janitor=' +
            this.id
        )
        .then(response => {
          this.activeCleanHoursDay = response.data.activeTime
          console.log(this.activeCleanHoursDay)
        })
        .catch(err => console.error(err))

      api
        .get(
          process.env.API +
            '/stats/janitor/week/active-time-total?janitor=' +
            this.id
        )
        .then(response => {
          this.activeCleanHoursWeek = response.data.activeTime
          console.log(this.activeCleanHoursWeek)
        })
        .catch(err => console.error(err))

      api
        .get(
          process.env.API +
            '/stats/janitor/month/active-time-total?janitor=' +
            this.id
        )
        .then(response => {
          this.activeCleanHoursMonth = response.data.activeTime
          console.log(this.activeCleanHoursMonth)
        })
        .catch(err => console.error(err))

      api
        .get(
          process.env.API +
            '/stats/janitor/day/pending-facilities?janitor=' +
            this.id
        )
        .then(response => {
          this.pendingFacility = response.data
          console.log(this.pendingFacility)
        })
        .catch(err => console.error(err))

        .finally(() => {
          this.$q.loading.hide()
        })
    },
    getUserFacilities() {
      this.$q.loading.show()

      let url =
        this.user.userType === 'janitor'
          ? '/facilities/under-janitor?janitor='
          : '/facilities/under-supervisor?supervisor='
      api
        .get(url + this.id)
        .then(response => {
          this.facilities = response.data
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    getdataforedit(data) {
      this.user.name = data.name
      this.username = data.username
      this.password = data.password
      this.phone = data.phone
      this.userType = 'janitor'
      this.reportsTo = data.reportsTo
      this.dialog = true
    },

    onEdit() {
      this.$q.loading.show()
      const updateEmployee = {
        name: this.user.name,
        username: this.user.username,
        password: this.user.password,
        phone: this.user.phone,
        userType: 'janitor',
        reportsTo: this.user.reportsTo
      }
      console.log('LOL:  ' + updateEmployee)
      api
        .post(`/users/update/${this.id}`, updateEmployee)
        .then(res => console.log(res.data))

      // this.$router.go()
      this.dialog = false
      this.$q.loading.hide()
    },

    deleteStaff() {
      api.delete(`/staff/${this.userDetails._id}`).then(res => res.data)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.no-overflow {
  overflow: hidden;
}
</style>
