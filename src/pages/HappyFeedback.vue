<template>
  <q-page padding>
    <q-card-section>
      <div class="q-mb-md text-center text-h4">Rate this washroom</div>

      <div class="q-mt-md text-center text-h6 text-weight-regular">
        {{ location }}
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-mt-md text-center text-h6 text-weight-regular">
        How was your experience?
      </div>
      <div class="q-mt-md container text-center">
        <span class="q-mx-md">
          <q-img height="4.5rem" width="4.5rem" :src="happyFace" />
        </span>
        <span class="q-mx-md">
          <q-img
            style="opacity: 0.15"
            height="4.5rem"
            width="4.5rem"
            :src="sadFaceDisabled"
          />
        </span>
      </div>
      <div class="q-mt-xl text-center text-h5 text-weight-regular">
        What did you Like?
      </div>
      <div class="container q-mt-md">
        <div class="row align-items-center justify-content-center">
          <div
            v-for="(opt, i) in sadFeedbackOptions"
            :key="i"
            class="q-pa-sm column q-gutter-xs"
          >
            <label class="label-width">
              <q-card
                :class="{ active: selectedFeedback[i] }"
                bordered
                class="my-card cursor-pointer"
              >
                <q-checkbox
                  v-model="selectedFeedback[i]"
                  size="xs"
                  :val="opt.value"
                  color="teal"
                  class="feedback-check"
                />
                <div class="text-center q-pt-sm q-pl-xs q-pr-xs">
                  <span>{{ opt.data }}</span>
                </div>
              </q-card>
            </label>
          </div>
        </div>
      </div>
      <q-card-section>
        <div class="q-pt-md row justify-center">
          <div class="col-12">
            <q-form>
              <div class="q-pa-sm">
                <r-input-file v-model="attachment" label="Attach a photo" />
              </div>

              <div class="q-pa-sm">
                <div class="q-gutter-y-md column">
                  <div class="q-mt-xl text-center text-h5 text-weight-regular">
                    Rate this Toilet
                  </div>
                  <q-rating
                    name="quality"
                    v-model="quality"
                    max="5"
                    size="3.5em"
                    color="green"
                    icon="star_border"
                    icon-selected="star"
                    no-dimming
                  />
                </div>
              </div>
              <div class="q-mt-xl text-center text-h6 text-weight-regular">
                This is to verify the authenticity of your feedback, data will
                remain private
              </div>
              <div class="q-pa-md" style="max-width: 300px">
                <form
                  @submit.prevent.stop="onSubmit"
                  @reset.prevent.stop="onReset"
                  class="q-gutter-md"
                >
                  <q-input
                    ref="name"
                    filled
                    v-model="name"
                    label="Your name *"
                    hint="Valid Name"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please type something'
                    ]"
                  />

                  <q-input
                    ref="number"
                    filled
                    outlined
                    v-model="phone"
                    label="Your Number *"
                    mask="##########"
                    hint="Enter your 10 digit number"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please type something'
                    ]"
                  />
                </form>
              </div>

              <div class="row q-pa-sm justify-center">
                <div class="col-md-6 col-xs-12">
                  <q-btn
                    rounded
                    class="full-width"
                    color="primary"
                    label="SUBMIT"
                    icon="check"
                    @click="submitFeedback"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>
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
  components: {
    RInputFile
  },

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
    const attachment = ref([''])

    const submitFeedback = () => {}

    const $q = useQuasar()
    const $store = useStore()

    return {
      sadFaceDisabled,
      happyFace,
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
    width: 100%
    max-width: 200px
    height: 7.8rem
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
</style>
