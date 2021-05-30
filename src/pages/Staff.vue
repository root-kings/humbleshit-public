<template>
  <q-page padding>
    <q-card bordered flat class="rounded-borders">
      <q-tabs v-model="tab" active-color="primary" narrow-indicator>
        <q-tab name="reportees" label="Reportees" />
        <q-tab name="all" label="All" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" swipeable animated>
        <q-tab-panel name="reportees" class="q-pa-none">
          <StaffList :stafflist="reporteeStaffList" />
        </q-tab-panel>

        <q-tab-panel name="all" class="q-pa-none">
          <StaffList :stafflist="allStaffList" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" class="btn">
      <q-btn
        fab
        icon="eva-person-add-outline"
        color="primary"
        @click="showAddStaffDialog"
      />
    </q-page-sticky>

    <q-dialog v-model="addStaffDialog" maximized>
      <StaffForm @done="doneAddingStaff" />
    </q-dialog>
  </q-page>
</template>

<script>
import StaffList from 'components/StaffList'
import StaffForm from 'components/StaffForm'

export default {
  components: {
    StaffList,
    StaffForm
  },

  data() {
    return {
      tab: 'reportees',
      addStaffDialog: false
    }
  },

  computed: {
    allStaffList() {
      return this.$store.getters['users/allStaff']
    },
    reporteeStaffList() {
      return this.$store.getters['users/reporteeStaff']
    }
  },

  mounted() {
    this.$store.dispatch('general/setTitle', 'Staff')
    this.getStaff()
  },

  methods: {
    getStaff() {
      this.$store.dispatch('users/fetchAllStaff')
      this.$store.dispatch('users/fetchReporteeStaff')
    },

    showAddStaffDialog() {
      this.addStaffDialog = true
    },

    doneAddingStaff() {
      this.addStaffDialog = false
      this.getStaff()
    }
  }
}
</script>
