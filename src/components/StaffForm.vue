<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Add Staff
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
    <q-card-section>
      <q-form>
        <q-input
          v-model="staffDetails.name"
          outlined
          label="Name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />

        <r-input-file v-model="staffDetails.img" label="Image" />

        <q-input
          v-model="staffDetails.phone"
          outlined
          label="Phone"
          lazy-rules
          :rules="[
            val =>
              (val !== null && val !== '') || 'Please type your phone number'
          ]"
          prefix="+91"
        />

        <q-input
          v-model="staffDetails.password"
          outlined
          label="Password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />

        <q-select
          v-model="staffDetails.reportsTo"
          outlined
          label="Reports To"
          :options="supervisorOptions"
          emit-value
          map-options
        />
      </q-form>

      <q-list bordered class="q-mt-md rounded-borders">
        <q-item-label header>Permissions </q-item-label>
        <q-item
          v-for="permission in permissions"
          :key="permission"
          v-ripple
          tag="label"
          dense
        >
          <q-item-section avatar>
            <q-checkbox
              v-model="staffDetails.permissions[permission]"
              val="teal"
              color="teal"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ permission }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-md items-center">
        <!-- <div class="col-auto" v-if="isEdit">
          <q-btn
            class="full-width"
            round
            flat
            icon="eva-trash-2-outline"
            type="submit"
            @click="deleteParameter"
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
            @click="addStaff"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from 'boot/axios'
import RInputFile from 'components/RInputFile.vue'

export default {
  components: {
    RInputFile
  },

  emits: ['done'],

  data() {
    return {
      staffDetails: {
        name: null,
        password: null,
        phone: null,

        reportsTo: null,
        img: null,
        permissions: {
          userRead: false,
          userWrite: false,
          facilityRead: true,
          facilityWrite: false,
          parameterRead: true,
          parameterWrite: false,
          reportRead: true,
          reportWrite: false,
          ticketRead: false,
          ticketWrite: false,
          staffRead: true,
          staffWrite: false,
          shiftRead: true,
          shiftWrite: false,
          statisticsRead: false
        }
      },
      tempimage: null,

      supervisorOptions: [],

      permissions: [
        'userRead',
        'userWrite',
        'facilityRead',
        'facilityWrite',
        'parameterRead',
        'parameterWrite',
        'reportRead',
        'reportWrite',
        'ticketRead',
        'ticketWrite',
        'staffRead',
        'staffWrite',
        'shiftRead',
        'shiftWrite',
        'statisticsRead'
      ]
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters['auth/user']
    }
  },
  mounted() {
    this.getSupervisors()
  },
  methods: {
    addStaff() {
      this.staffDetails.organization = this.loggedUser.organization
      this.$q.loading.show()
      api
        .post('/users/create', this.staffDetails)
        .then(response => {
          this.$emit('done')
        })
        .catch(err => {
          console.error(err)
          if (err.response.status == 409)
            this.$q.notify({
              type: 'negative',
              message: 'Phone number already exists.'
            })
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    uploadImage() {
      this.$q.loading.show()
      var formdata = new FormData()
      formdata.append('media', this.tempimage)
      api
        .post('/uploads', formdata, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.staffDetails.img = response.data[0].path
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    getSupervisors() {
      api
        .get('/users/staff')
        .then(response => {
          this.supervisorOptions = response.data.map(user => ({
            value: user._id,
            label: user.name
          }))
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    }
  }
}
</script>
