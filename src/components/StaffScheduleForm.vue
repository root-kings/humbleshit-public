<template>
  <q-card>
    <q-card-section>
      <q-item-label class="text-h6">Schedule</q-item-label>
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="q-gutter-sm row">
        <div class="col">
          <q-input
            v-model="sch.start"
            filled
            label="Start time"
            mask="time"
            :rules="['time']"
          >
            <template #append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="sch.start" format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input
            v-model="sch.end"
            filled
            label="End time"
            mask="time"
            :rules="['time']"
          >
            <template #append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="sch.end" format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="q-pa-md" align="right">
      <q-btn color="primary" label="Save" @click="save" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'StaffScheduleForm',

  props: ['schedule', 'janitor'],

  data() {
    return {
      sch: {
        start: null,
        end: null
      }
    }
  },

  mounted() {
    this.sch = { ...this.schedule }
  },

  methods: {
    save() {
      this.$q.loading.show()
      api
        .put(process.env.API + '/users/' + this.janitor._id + '/shift', {
          shift: this.sch
        })
        .then(response => {
          this.$emit('done')
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
