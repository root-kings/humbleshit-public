<template>
  <q-page padding class="q-mb-xl q-pb-xl">
    <q-card bordered flat class="rounded-borders">
      <q-tabs v-model="tab" active-color="primary" narrow-indicator>
        <q-tab name="parameters" label="Parameters" />
        <q-tab name="categories" label="Categories" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" swipeable animated>
        <q-tab-panel name="parameters" class="q-pa-none">
          <q-list v-for="(category, idx) in groupedParameters" :key="idx">
            <q-expansion-item expand-separator :label="category.category">
              <q-list separator bordered class="q-ma-md rounded-borders">
                <q-item
                  v-for="parameter in category.parameters"
                  :key="parameter._id"
                  clickable
                  @click="showParameterDialog(parameter)"
                >
                  <q-item-section>
                    <q-item-label>
                      {{ parameter.name }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section v-if="parameter.img" avatar>
                    <q-avatar size="md" color="grey-3">
                      <q-img :src="parameter.img" />
                    </q-avatar>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
              fab
              icon="eva-plus-circle-outline"
              color="primary"
              @click="showParameterDialog(null)"
            />
          </q-page-sticky>
        </q-tab-panel>
        <q-tab-panel name="categories" class="q-pa-none">
          <q-list separator>
            <q-item
              v-for="category in categories"
              :key="category._id"
              clickable
              @click="showCategoryDialog(category)"
            >
              <q-item-section>
                <q-item-label>{{ category.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
              fab
              icon="eva-plus-square-outline"
              color="secondary"
              @click="showCategoryDialog(null)"
            />
          </q-page-sticky>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-dialog v-model="categoryDialog" maximized persistent>
      <ParameterCategoryForm
        :is-edit="isCategoryEdit"
        :category="selectedCategory"
        @done="categoryDone"
      />
    </q-dialog>

    <q-dialog v-model="parameterDialog" maximized persistent>
      <ParameterForm
        :is-edit="isParameterEdit"
        :parameter="selectedParameter"
        :categories="categories"
        @done="parameterDone"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import ParameterCategoryForm from 'components/ParameterCategoryForm'
import ParameterForm from 'components/ParameterForm'

const PARAMETER = { _id: null, name: null }
const CATEGORY = { _id: null, name: null, category: null }

import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageParameters',

  components: {
    ParameterCategoryForm,
    ParameterForm
  },

  setup() {
    const $store = useStore()
    const $router = useRouter()
    const $q = useQuasar()

    let tab = ref('parameters')

    let categories = computed(() => $store.getters['parameters/categories'])

    let groupedParameters = computed(
      () => $store.getters['parameters/groupedParameters']
    )

    let categoryDialog = ref(false)
    let isCategoryEdit = ref(false)
    let selectedCategory = ref(PARAMETER)

    let parameterDialog = ref(false)
    let isParameterEdit = ref(false)
    let selectedParameter = ref(CATEGORY)

    const fetchCategories = () => {
      $store.dispatch('parameters/fetchCategories')
    }

    const fetchParameters = () => {
      $store.dispatch('parameters/fetchParametersGrouped')
    }

    onMounted(() => {
      $store.dispatch('general/setTitle', 'Parameters')
      fetchCategories()
      fetchParameters()
    })

    const showParameterDialog = parameter => {
      if (!parameter) {
        isParameterEdit.value = false
        selectedParameter.value = { ...PARAMETER }
      } else {
        isParameterEdit.value = true
        selectedParameter.value = parameter
      }
      categoryDialog.value = false
      parameterDialog.value = true
    }

    const parameterDone = () => {
      categoryDialog.value = false
      parameterDialog.value = false
      fetchParameters()
    }

    const showCategoryDialog = category => {
      if (!category) {
        isCategoryEdit.value = false
        selectedCategory.value = { ...CATEGORY }
      } else {
        isCategoryEdit.value = true
        selectedCategory.value = category
      }
      categoryDialog.value = true
      parameterDialog.value = false
    }

    const categoryDone = () => {
      categoryDialog.value = false
      parameterDialog.value = false
      fetchCategories()
    }

    return {
      tab,

      groupedParameters,
      showParameterDialog,

      categories,
      showCategoryDialog,

      categoryDialog,
      isCategoryEdit,
      selectedCategory,
      categoryDone,

      parameterDialog,
      isParameterEdit,
      selectedParameter,
      parameterDone
    }
  }
})
</script>
