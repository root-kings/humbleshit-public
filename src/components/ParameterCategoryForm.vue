<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Parameter Category
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
        v-model="normalizedCategory.name"
        outlined
        label="Name"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
        class="q-pa-none"
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
            @click="deleteCategory"
          />
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            rounded
            label="Save"
            type="submit"
            color="primary"
            @click="saveCategory"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent, ref, reactive } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'ParameterCategoryForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object,
      default: () => ({
        name: null
      })
    }
  },

  emits: ['done'],

  setup(props, { emit }) {
    const $q = useQuasar()

    let normalizedCategory = ref({})

    normalizedCategory.value = { ...props.category }

    const saveCategory = () => {
      if (props.isEdit) updateCategory()
      else createCategory()
    }

    const createCategory = () => {
      $q.loading.show()
      api
        .post('/parameters/categories', normalizedCategory.value)
        .then(response => {
          emit('done')
        })
        .catch(err => console.error(err))
        .finally(() => {
          $q.loading.hide()
        })
    }

    const updateCategory = () => {
      $q.loading.show()
      api
        .put(
          '/parameters/categories/' + normalizedCategory.value._id,
          normalizedCategory.value
        )
        .then(response => {
          emit('done')
        })
        .catch(err => console.error(err))
        .finally(() => {
          $q.loading.hide()
        })
    }

    const deleteCategory = () => {
      $q.loading.show()
      api
        .delete('/parameters/categories/' + normalizedCategory.value._id)
        .then(response => {
          emit('done')
        })
        .catch(err => console.error(err))
        .finally(() => {
          $q.loading.hide()
        })
    }

    return {
      normalizedCategory,
      saveCategory,
      deleteCategory
    }
  }
}
</script>
