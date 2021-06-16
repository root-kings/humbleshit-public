<template>
  <q-page padding>
    <q-card-section>
      <div class="q-mb-md text-center text-h4">Rate this washroom</div>

      <div class="q-mt-md text-center text-h6 text-weight-regular">
        {{ facilityName }}
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-mt-md text-center text-h6 text-weight-regular">
        How was your experience?
      </div>
      <div class="q-mt-md container text-center">
        <span class="q-mx-md">
          <q-img height="4.5rem" width="4.5rem" :src="sadFace" />
        </span>
        <span class="q-mx-md">
          <q-img
            style="opacity: 0.15"
            height="4.5rem"
            width="4.5rem"
            :src="happyFaceDisabled"
          />
        </span>
      </div>
      <div class="q-mt-xl text-center text-h5 text-weight-regular">
        What went wrong?
      </div>
      <div class="container q-mt-md">
        <div class="row items-center justify-center">
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
                  color="red"
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
            <q-form ref="sadFeedbackForm">
              <div class="q-pt-xs">
                <r-input-file
                  v-model="sadFeedbackInfo.attachment"
                  label="Attach a photo"
                />
              </div>

              <div class="q-pt-xs">
                <q-toggle
                  v-model="sadFeedbackInfo.isImmediateService"
                  color="primary"
                  label="Request immediate service?"
                  keep-color
                  left-label
                />
              </div>
              <div
                class="q-mt-sm text-center text-subtitle1 text-weight-regular"
              >
                We'll message when we've got this issue fixed for you.
              </div>
              <div class="q-pt-xs">
                <q-input
                  v-model="sadFeedbackInfo.name"
                  outlined
                  label="Name*"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please enter name',
                  ]"
                />
              </div>
              <div class="q-pt-xs">
                <q-input
                  v-model="sadFeedbackInfo.phone"
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
              <div class="row q-pt-xs justify-center">
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
          <q-card-section>
            <q-form ref="inputOTP">
              <q-input
                v-model="otp"
                outlined
                label="Enter Secret Code"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '' && val.length > 5) ||
                    'Please enter a valid 6-digit code',
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
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import RInputFile from "components/RInputFile.vue";
import { useRoute, useRouter } from "vue-router";
import { api, fetcher } from 'boot/axios'

export default defineComponent({
  name: "SadFeedback",
  components: {
    RInputFile,
  },

  setup() {
    const $store = useStore();
    const $route = useRoute();
    const $router = useRouter();

    onMounted(() => {
      $store.dispatch("general/setTitle", "humbleShit");
    });

    let sadFeedbackOptions = ref(computed(() => $store.getters['general/sadFeedbacks'])).value
    let facilityName = computed(() => $store.getters['general/facilityName'])

    let sadFeedbackInfo = reactive({
      name: null,
      attachment: null,
      _id: null,
      isImmediateService: ref(false),
      phone: null,
    });

    let dialog = ref(false);
    let otp = ref("");
    let selectedFeedback = ref(Array(sadFeedbackOptions.length).fill(false));

    let happyFaceDisabled = ref(require("../assets/happy-face-disabled.png"));
    let sadFace = ref(require("../assets/sad-face.png"));
    const sadFeedbackForm = ref(null)
    const inputOTP = ref(null)

    const verifyOTP = () => {
      sadFeedbackForm.value.validate().then(isValidated => {
        if (isValidated) {
          dialog.value = true;
        }
      })
    };
    const onSubmit = () => {
      inputOTP.value.validate().then(isValidated => {
        if (isValidated) {
          let takenFeedback = []
          for(const idx in selectedFeedback.value) if(selectedFeedback.value[idx]) takenFeedback.push(sadFeedbackOptions[idx])
          sadFeedbackInfo.feedbacks = takenFeedback;
          api
            .put('/feedbacks/' + $route.query.feedbackId, { sadFeedbackInfo: sadFeedbackInfo })
            .then(response => {
              // console.log(response)
              if(response.status == 200) {
                $router.push({
                  name: "thankyou",
                  query: { 
                    key: $route.query.key,
                    feedbackId: $route.query.feedbackId,
                    }
                })
              }
            })
            .catch(error => {
              console.error(error)
            })
          dialog.value = false
        }
      })
    };

    return {
      RInputFile,
      otp,
      dialog,
      sadFeedbackInfo,
      happyFaceDisabled,
      sadFace,
      sadFeedbackOptions,
      selectedFeedback,
      facilityName,
      sadFeedbackForm,
      inputOTP,
      onSubmit,
      verifyOTP,
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 200px
  height: 7.8rem
  margin: .2em
  background: rgba(243, 230, 242, 0.5) // Red
  // background: rgba(147, 219, 112, 0.2) // Green
  border: 3px solid rgba(112, 128, 144, 0.8)
.active
  // background: rgba(147, 219, 112, 0.7) // Green
  border-color: rgba(102, 63, 83, 0.5)
  background: rgba(224, 189, 199, 0.8) // Red
.label-width
  width: 7.75rem
.feedback-check
  top: -5px
  left: -5px
</style>
