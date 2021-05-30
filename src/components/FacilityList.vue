<template>
  <q-list separator>
    <q-item
      v-for="facility in facilities"
      :key="facility._id"
      v-ripple
      clickable
      :to="'/facilities/' + facility._id"
    >
      <q-item-section avatar>
        <q-icon name="brightness_1" :color="statusColor(facility)" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-body1">
          {{ facility.name }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {
  props: {
    facilities: {
      type: Array,
      default: () => []
    },
    issues: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    statusColor(facility) {
      if (facility.checkStatus === 'done') {
        return 'positive'
      } else if (facility.checkStatus === 'doing') {
        return 'warning'
      } else {
        return 'negative'
      }
    }
  }
}
</script>
