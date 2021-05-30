<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <q-img
        src="/web_hi_res_512.png"
        width="50vmin"
        class="rounded-borders shadow-1"
      ></q-img>

      <div class="text-center q-mt-md text-h6">humbleShit</div>
      <div class="text-center text-caption text-grey">version 3.0.0</div>

      <div class="text-center q-mt-md">
        A Product of Humble Innovations Private Limited.
      </div>
      <div class="text-center text-caption text-grey">
        &copy; 2021 All Rights Reserved.
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const $store = useStore()

    onMounted(() => {
      $store.dispatch('general/setTitle', 'About')
    })

    return {}
  }
})
</script>
