<template>
  <q-page padding>
    <q-card-section>
      <div class="q-pa-md" style="max-width: 300px"></div>

      <div class="q-pa-sm column q-gutter-xs">
        <label class="label-width">
          <q-card
            :class="{ active: selectedFeedback }"
            bordered
            class="my-card cursor-pointer"
          >
            <span class="q-mx-md">
              <q-img height="4.5rem" width="4.5rem" :src="sendHappy" />
            </span>
            <div class="text-center q-pt-sm q-pl-xs q-pr-xs">
              <span></span>
            </div>
          </q-card>
        </label>
      </div>

      <div class="tellus">
        <h6>Tell us more about your experience</h6>
      </div>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input
          v-model="textareaModel"
          filled
          clearable
          autogrow
          color="green-8"
          label="Tell us More"
          :shadow-text="textareaShadowText"
          @keydown="processTextareaFill"
          @focus="processTextareaFill"
        />
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import RInputFile from 'components/RInputFile.vue'

export default defineComponent({
  name: 'PublicFeedback',

  data() {
    return {
      phone: null,
      name: null
    }
  },

  setup() {
    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
    })

    let sadFeedbackOptions = [
      {
        data: 'Water availability & leakage',
        value: '1'
      },
      {
        data: 'Cleanliness & odour',
        value: '2'
      },
      {
        data: 'Closet/Flush issues',
        value: '3'
      },
      {
        data: 'Broken facilities',
        value: '4'
      },
      {
        data: 'Soap/Toilet paper',
        value: '5'
      },
      {
        data: 'Other',
        value: '6'
      }
    ]
    const dummyData = ref('')
    const immediateService = ref(false)
    const badReviewDetail = ref('')
    const reviewerName = ref('')
    const selectedFeedback = ref(Array(sadFeedbackOptions.length).fill(false))
    const location = ref('AIIMS Patna. Washroom 7')

    const sadFaceDisabled = ref(require('../assets/sad-face-disabled.png'))
    const happyFace = ref(require('../assets/happy-face.png'))
    const sendHappy = ref(require('../assets/send.png'))
    const attachment = ref([''])

    const submitFeedback = () => {}

    const $q = useQuasar()
    const $store = useStore()

    return {
      sadFaceDisabled,
      happyFace,
      sendHappy,
      sadFeedbackOptions,
      selectedFeedback,
      attachment,
      RInputFile,
      immediateService,
      badReviewDetail,
      reviewerName,
      submitFeedback,
      location
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
    width: 30rem
    max-width: 300px
    height: 20rem
    margin: .2em
    // ! background: rgba(243, 230, 242, 0.5) // Red
    background: rgba(147, 219, 112, 0.2) // Green
    border: 3px solid rgba(112, 128, 144, 0.8)

.active
    background: rgba(147, 219, 112, 0.7) // Green

    border-color: rgba(102, 63, 83, 0.5)
    // ! background: rgba(224, 189, 199, 0.8) // Red
.label-width
    width: 7.75rem
.align-items-center
    align-items: center
.justify-content-center
    justify-content: center
.d-none
    display: none
.card-checkbox
    height: 1.5rem
.feedback-check
    top:-5px
    left:-5px



.thankyou
  background: rgba(147, 219, 112, 0.2)
  text-align: center
  width: 13rem
  height: 13rem
  border: 1px solid green
  border-radius: 2%
  padding: 50px
  margin: 20px
</style>
