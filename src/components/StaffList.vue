<template>
  <q-list>
    <q-item
      v-for="staff in stafflist"
      :key="staff._id"
      v-ripple
      clickable
      :to="'/staff/' + staff._id"
    >
      <q-item-section avatar>
        <q-avatar color="grey-3">
          <q-img :src="staff.img" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ staff.name }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon
          v-show="staff.status == 'unavailable'"
          name="brightness_1"
          color="negative"
        />
        <q-icon
          v-show="staff.status == 'busy'"
          name="brightness_1"
          color="warning"
        />
        <q-icon
          v-show="staff.status == 'available'"
          name="brightness_1"
          color="positive"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    stafflist: {
      type: Array,
      default: () => []
    }
  }
}
</script>
