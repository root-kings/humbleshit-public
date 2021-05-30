<template>
  <q-list separator bordered class="bg-white rounded-borders">
    <q-item
      v-for="shift in shifts"
      :key="shift._id"
      v-ripple
      clickable
      :to="'/shifts/' + shift._id"
    >
      <q-item-section>
        <q-item-label>{{ shift.startTime }} - {{ shift.endTime }}</q-item-label>
        <q-item-label
          v-if="shift.useTemporaryMapping"
          caption
          class="text-green text-italic"
        >
          Temporary Mapping Active
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        {{ shift.activeFacilities }} Facilities
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    shifts: {
      type: Array,
      default: () => []
    }
  }
}
</script>
