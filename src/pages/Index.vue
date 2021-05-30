<template>
  <q-page padding>
    <div v-if="user">
      <q-card-section>
        <div class="q-mb-md text-center text-body1">Welcome</div>

        <div v-if="user.img" class="text-center">
          <q-avatar size="64px">
            <q-img :src="user.img" />
          </q-avatar>
        </div>

        <div class="q-mt-md text-center text-h6 text-primary">
          {{ user.name }}
        </div>
      </q-card-section>
    </div>

    <q-card bordered flat class="q-mt-md">
      <q-card-section v-if="!activeShift" class="text-center">
        <q-item-label header>
          Your don't have any upcoming shift today.
        </q-item-label>
      </q-card-section>

      <q-card-section
        v-else-if="activeShift.status == 'upcoming'"
        class="text-center"
      >
        <q-item-label header>
          Your next shift starts at
          {{ $filters.humanTime(activeShift.expectedInTime) }}
        </q-item-label>
      </q-card-section>

      <q-card-section
        v-else-if="activeShift.status == 'late'"
        class="text-center"
      >
        <q-item-label header>
          Your are late for your shift which started at
          {{ $filters.humanTime(activeShift.expectedInTime) }}
        </q-item-label>
        <q-btn label="Start now" rounded color="primary" @click="startShift" />
      </q-card-section>
      <q-card-section
        v-else-if="activeShift.status == 'started'"
        class="text-center"
      >
        <q-item-label header>
          Your shift is till
          {{ $filters.humanTime(activeShift.expectedOutTime) }}
        </q-item-label>
        <q-btn label="End now" rounded color="primary" @click="endShift" />
      </q-card-section>
    </q-card>

    <q-card v-if="shifts.length" bordered flat class="q-mt-md">
      <q-list>
        <q-item-label header>Your Shifts</q-item-label>

        <q-item v-for="shift in shifts" :key="shift._id" clickable>
          <q-item-section side>
            <q-icon
              :name="statusIcons[shift.status]"
              :color="statusColors[shift.status]"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ $filters.humanTime(shift.expectedInTime) }} -
              {{ $filters.humanTime(shift.expectedOutTime) }}
            </q-item-label>
          </q-item-section>
          <q-item-section
            v-if="shift.status == 'started' || shift.status == 'finished'"
            side
          >
            <q-item-label>
              {{
                shift.actualInTime ? $filters.humanTime(shift.actualInTime) : ''
              }}
              -
              {{
                shift.actualOutTime
                  ? $filters.humanTime(shift.actualOutTime)
                  : ''
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageIndex',

  setup() {
    const $store = useStore()

    const statusIcons = {
      finished: 'eva-checkmark-square-outline',
      missed: 'eva-close-circle-outline',
      late: 'eva-clock-outline',
      started: 'eva-log-out-outline',
      upcoming: 'eva-square-outline'
    }

    const statusColors = {
      finished: 'positive',
      missed: 'negative',
      late: 'warning',
      started: 'positive',
      upcoming: 'primary'
    }

    const user = computed(() => $store.getters['auth/user'])
    const shifts = computed(() => $store.getters['auth/userShifts'])
    const activeShift = computed(() => $store.getters['auth/userActiveShift'])

    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
      $store.dispatch('auth/fetchUser')
      $store.dispatch('auth/fetchUserShifts')
    })

    const startShift = () => {
      $store.dispatch('auth/startShift', activeShift.value)
    }

    const endShift = () => {
      $store.dispatch('auth/endShift', activeShift.value)
    }

    return {
      statusIcons,
      statusColors,

      user,
      shifts,
      activeShift,

      startShift,
      endShift
    }
  }
})
</script>
