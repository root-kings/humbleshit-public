<template>
  <q-input
    v-model="filePath"
    outlined
    color="primary"
    :label="label"
    class="q-mb-md"
  >
    <template #prepend>
      <q-icon name="insert_photo" />
    </template>
    <template #append>
      <q-spinner v-if="fileProgress" />
      <q-btn
        v-else
        round
        dense
        color="primary"
        icon="attach_file"
        @click="triggerFileInput"
      />
    </template>
  </q-input>

  <input id="image-file" class="hidden" type="file" @input="handleInput" />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'RInputFile',

  props: {
    label: {
      type: String,
      default: 'File URL'
    },

    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    let inputFile = ref(null)

    let filePath = ref('')

    let fileProgress = ref(false)

    const triggerFileInput = () => {
      document.getElementById('image-file').click()
    }

    onMounted(() => {
      filePath.value = props.modelValue
    })

    const uploadFile = file => {
      fileProgress.value = true

      let formdata = new FormData()
      formdata.append('media', file)

      api
        .post(process.env.API + '/uploads', formdata, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
          filePath.value = response.data[0].path
          emit('update:modelValue', filePath)
        })
        .catch(err => console.error(err))
        .finally(() => {
          fileProgress.value = false
        })
    }

    const handleInput = e => {
      let file = e.target.files.length ? e.target.files[0] : null
      console.log(e)
      if (file) uploadFile(file)
    }

    return {
      inputFile,

      fileProgress,
      filePath,

      triggerFileInput,
      handleInput
    }
  }
})
</script>
