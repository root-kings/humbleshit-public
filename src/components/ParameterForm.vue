<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Parameter
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
      <q-input
        v-model="normalizedParameter.name"
        outlined
        label="Name"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />

      <r-input-file v-model="normalizedParameter.img" label="Image" />

      <q-select
        v-model="normalizedParameter.category"
        outlined
        :options="categories"
        option-label="name"
        option-value="_id"
        label="Category"
        class="q-mb-md"
        emit-value
        map-options
      />
    </q-card-section>

    <q-card-section class="absolute-bottom">
      <div class="row q-col-gutter-md items-center">
        <div v-if="isEdit" class="col-auto">
          <q-btn
            class="full-width"
            round
            flat
            icon="eva-trash-2-outline"
            type="submit"
            color="negative"
            @click="deleteParameter"
          />
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            rounded
            label="Save"
            type="submit"
            color="primary"
            @click="saveParameter"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { api } from 'boot/axios'
import RInputFile from 'components/RInputFile.vue'

export default {
  name: 'ParameterForm',

  components: { RInputFile },

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    parameter: {
      type: Object,
      default: () => ({
        name: null,
        category: null
      })
    },
    categories: {
      type: Array,
      default: () => []
    }
  },

  emits: ['done'],

  data() {
    return {
      tempimage: null,

      normalizedParameter: {
        name: null,
        category: null,
        img: null
      }
    }
  },

  created() {
    this.normalizedParameter = { ...this.parameter }
  },

  methods: {
    saveParameter() {
      if (this.isEdit) this.updateParameter()
      else this.createParameter()
    },

    createParameter() {
      this.$q.loading.show()
      api
        .post('/parameters', this.normalizedParameter)
        .then(response => {
          this.$emit('done')
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    updateParameter() {
      this.$q.loading.show()
      api
        .put(
          '/parameters/' + this.normalizedParameter._id,
          this.normalizedParameter
        )
        .then(response => {
          this.$emit('done')
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    deleteParameter() {
      this.$q.loading.show()
      api
        .delete('/parameters/' + this.normalizedParameter._id)
        .then(response => {
          this.$emit('done')
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    }
  }
}
</script>
