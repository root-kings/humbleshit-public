<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Add Shift
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
    <q-card-section class="q-pa-none">
      <q-form>
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
      </q-form>
    </q-card-section>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" class="btn">
      <q-btn
        fab
        icon="eva-arrow-forward-outline"
        color="primary"
        @click="addShift"
      />
    </q-page-sticky>

    <!-- <q-card-section class="absolute-bottom">
      <div class="row q-col-gutter-md items-center">
        <div class="col">
          <q-btn
            class="full-width"
            rounded
            label="Save"
            type="submit"
            @click="addShift"
            color="primary"
          />
        </div>
      </div>
    </q-card-section> -->
  </q-card>
</template>

<script>
import { api } from 'boot/axios'

export default {
  emits: ['done'],

  data() {
    return {
      shift: {
        startTime: null,
        endTime: null
      }
    }
  },

  methods: {
    addShift() {
      this.$q.loading.show()
      api
        .post('/shifts', this.shift)
        .then(response => {
          this.$emit('done')
          this.$router.push('/shifts/' + response.data._id)
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
