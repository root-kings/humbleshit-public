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
        What did you like?
      </div>
      <div class="container q-mt-md">
        <div class="row items-center justify-center">
          <div
            v-for="(opt, i) in happyFeedbackOptions"
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
              <div class="q-pt-xs text-center">
                <div class="text-h6 text-weight-regular">
                  Rate this toilet
                </div>
                <q-rating
                  v-model="happyFeedbackInfo.rating"
                  name="quality"
                  max="5"
                  color="green"
                  icon="star_border"
                  icon-selected="star"
                  class="star-size"
                  no-dimming
                />
              </div>
              <div class="q-pt-md">
                <q-input
                  v-model="happyFeedbackInfo.name"
                  outlined
                  label="Name*"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please enter name',
                  ]"
                />
              </div>
              <div class="q-pt-xs">
                <q-input
                  v-model="happyFeedbackInfo.phone"
                  outlined
                  label="Phone*"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '' && val.length > 9) ||
                      'Please type a valid phone number',
                  ]"
                  mask="##########"
                />
              </div>
              <div
                class="q-mt-xs text-center text-subtitle1 text-weight-regular"
              >
                This is to verify the authenticity of your feedback, data will
                remain private
              </div>
              <div class="row q-pt-md justify-center">
                <div class="col-md-6 col-xs-12">
                  <q-btn
                    rounded
                    class="full-width"
                    color="primary"
                    label="Verify"
                    icon="fingerprint"
                    @click="verifyOTP"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>
      <q-dialog v-model="dialog" position="bottom">
        <q-card class="full-width">
          <q-card-section class>
            <q-input
              v-model="otp"
              outlined
              label="Enter OTP"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '' && val.length > 5) ||
                  'Please enter a valid 6-digit OTP',
              ]"
              mask="######"
            />
            <div class="row q-pa-sm justify-center">
              <div class="col-md-6 col-xs-12">
                <q-btn
                  rounded
                  class="full-width"
                  color="primary"
                  label="Submit"
                  icon="check"
                  @click="onSubmit"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from "vue-router";
import { api, fetcher } from 'boot/axios'

export default defineComponent({
  name: 'HappyFeedback',
  components: {
  },

  setup() {
    const $store = useStore()
    const route = useRoute();
    const $router = useRouter();

    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
      console.log('happy route : ', route.query)
    })

    let happyFeedbackOptions = ref(computed(() => $store.getters['general/happyFeedbacks'])).value

    let happyFeedbackInfo = reactive({
      name: null,
      rating: 0,
      _id: null,
      phone: null,
      feedbacks: null,
    });

    let dialog = ref(false);
    let otp = ref("");
    const selectedFeedback = ref(Array(happyFeedbackOptions.length).fill(false))
    const location = ref('AIIMS Patna. Washroom 7')

    const sadFaceDisabled = ref(require('../assets/sad-face-disabled.png'))
    const happyFace = ref(require('../assets/happy-face.png'))

    const verifyOTP = () => {
      dialog.value = true;
    };
    const onSubmit = () => {
      let takenFeedback = []
      for(const idx in selectedFeedback.value) if(selectedFeedback.value[idx]) takenFeedback.push(happyFeedbackOptions[idx])
      happyFeedbackInfo.feedbacks = takenFeedback;
      $router.push({
        name: "thankyou",
        query: { 
          key: route.query.key,
          feedbackId: route.query.feedbackId,
          }
      })

      // api
      //   .put('/feedbacks/' + route.query.feedbackId, { happyFeedbackInfo: happyFeedbackInfo })
      //   .then(response => {
      //     console.log(response)
      //     if(response.status == 200) {
      //       $router.push({
      //         name: "thankyou",
      //         query: { 
      //           key: route.query.key,
      //           feedbackId: route.query.feedbackId,
      //           }
      //       })
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })
      dialog.value = false
    };

    return {
      otp,
      dialog,
      sadFaceDisabled,
      happyFace,
      happyFeedbackOptions,
      selectedFeedback,
      location,
      happyFeedbackInfo,
      onSubmit,
      verifyOTP,
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
.star-size
    font-size: 3.2em
@media (max-width: 330px)
    .star-size
        font-size: 2.5em
</style>
