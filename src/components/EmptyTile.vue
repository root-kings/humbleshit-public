<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-center">
        <q-icon size="96px" :name="icon" color="grey-4" />
      </div>
    </q-card-section>

    <q-item-label class="text-center" header>{{ label }}</q-item-label>

    <q-card-section v-if="to">
      <div class="text-center">
        <q-btn
          no-caps
          unelevated
          rounded
          :label="action"
          :to="to"
          color="primary"
          text-color="secondary"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'eva-alert-triangle-outline'
    },
    label: {
      type: String,
      default: 'Sorry! No data found.'
    },
    to: {
      type: String,
      default: null
    },
    action: {
      type: String,
      default: null
    }
  }
}
</script>
