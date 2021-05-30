<template>
  <q-page class="q-pa-md">
    <div v-if="loading">
      <SListItem v-for="i in 5" :key="i" />
    </div>

    <div v-else-if="empty">
      <EmptyTile
        label="There are no issues."
        icon="eva-checkmark-circle-outline"
      />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div v-for="(category, idx) in organizedIssues" :key="idx" class="col-12">
        <q-list bordered separator class="bg-white rounded-borders">
          <q-item>
            <q-item-section>
              <q-item-label header class="q-pa-none">
                {{ category.name }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon
                v-if="category.total"
                name="eva-alert-triangle-outline"
                size="sm"
                class="float-right"
                rounded
                color="negative"
              />

              <q-icon
                v-else
                name="eva-checkmark-circle-outline"
                size="sm"
                class="float-right"
                rounded
                color="positive"
              />
            </q-item-section>
          </q-item>

          <q-item
            v-for="issue in category.issues"
            :key="issue._id"
            :to="'/tickets/by-parameter/' + issue._id"
          >
            <q-item-section>{{ issue.name }}</q-item-section>
            <q-item-section side>{{ issue.issueCount }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { fetcher } from 'boot/axios'
import useSWRV from 'swrv'
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

import SListItem from 'components/skeletons/SListItem'
import EmptyTile from 'components/EmptyTile'

export default defineComponent({
  name: 'PageTicketOverview',

  components: {
    SListItem,
    EmptyTile
  },

  setup() {
    const $store = useStore()

    onMounted(() => {
      $store.dispatch('general/setTitle', 'Ticket Overview')
    })

    let { data: categories } = useSWRV('/parameters/categories', fetcher)

    let { data: issues } = useSWRV('/tickets/unresolved/issues/count', fetcher)

    let loading = computed(() => !categories.value || !issues.value)

    let empty = computed(() => !loading.value && !issues.value.length)

    let organizedIssues = computed(() => {
      if (loading.value) return []

      let organized = []
      categories.value.forEach(category => {
        let i = issues.value.filter(issue => issue.category === category._id)
        let org = {
          name: category.name,
          issues: i,
          total: i.reduce((ac, issue) => (ac += issue.issueCount), 0)
        }

        organized.push(org)
      })

      return organized
    })

    return {
      categories,
      issues,

      loading,
      empty,
      organizedIssues
    }
  }
})
</script>
