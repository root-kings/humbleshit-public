<template>
  <q-page padding>
    <div v-if="loading">
      <SListItem v-for="i in 5" :key="i" />
    </div>

    <div v-else-if="empty">
      <EmptyTile label="There are no shifts." icon="eva-clock-outline" />
    </div>

    <div v-else>
      <ShiftList :shifts="shifts" />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="eva-plus-outline"
        color="primary"
        @click="showAddShiftDialog"
      />
    </q-page-sticky>

    <q-dialog v-model="addShiftDialog" maximized persistent>
      <ShiftForm @done="doneAddingShift" />
    </q-dialog>
  </q-page>
</template>

<script>
import ShiftList from 'components/ShiftList'
import ShiftForm from 'components/ShiftForm'

import SListItem from 'components/skeletons/SListItem'
import EmptyTile from 'components/EmptyTile'

import { defineComponent, ref, onMounted, computed } from 'vue'

import useSWRV from 'swrv'
import { fetcher } from 'boot/axios'

import { useStore } from 'vuex'

export default defineComponent({
  components: {
    ShiftList,
    ShiftForm,
    SListItem,
    EmptyTile
  },

  setup() {
    const $store = useStore()

    let tab = ref('supervisors')

    onMounted(() => {
      $store.dispatch('general/setTitle', 'Shifts') // todo
    })

    let { data: shifts, mutate: mutateShifts } = useSWRV('/shifts', fetcher)

    let loading = computed(() => !shifts.value)

    let empty = computed(() => !loading.value && !shifts.value.length)

    let addShiftDialog = ref(false)

    let showAddShiftDialog = () => {
      addShiftDialog.value = true
    }

    let doneAddingShift = () => {
      addShiftDialog.value = false
      mutateShifts()
    }

    return {
      tab,

      loading,
      empty,
      shifts,

      addShiftDialog,
      showAddShiftDialog,
      doneAddingShift
    }
  }
})
</script>
