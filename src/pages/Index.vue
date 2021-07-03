<template>
  <q-page padding>
    <q-card-section>
        <div class="q-mb-md text-center text-h4">Rate this washroom</div>

        <div class="q-mt-md text-center text-h6 text-weight-regular">
            {{ facilityName }}
        </div>
    </q-card-section>

    <q-card-section>
        <div class="q-mt-md text-dark text-weight-medium">
            What defines you best?
        </div>
        <q-form ref="userForm">
          <q-select
              v-model="userFeedbackObj.userType"
              outlined
              :options="userTypeList"
              label="I am"
              class="q-mb-md"
              :rules="[val => (val && val.length > 0) || 'Please select an option']"
          />
          <q-input v-if="userFeedbackObj.userType == 'Other'"
              v-model="userFeedbackObj.userSubType"
              outlined
              label="Name"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <div class="q-mt-xl row items-center justify-evenly">
              <q-card
                bordered
                class="happy-card cursor-pointer text-center"
              >
                <span>
                    <q-img
                        height="7rem"
                        width="7rem"
                        :src="happyFace"
                        @click="getUserFeedback('good')"
                    />
                </span>
              </q-card>
              <q-card
                bordered
                class="sad-card cursor-pointer text-center"
              >
              <span>
                  <q-img
                      height="7rem"
                      width="7rem"
                      :src="sadFace"
                      @click="getUserFeedback('bad')"
                  />
              </span>
              </q-card>
            
          </div>
          <!-- <q-btn
            rounded
            class="full-width"
            color="primary"
            label="Submit"
            icon="check"
            @click="enableNotification"
          /> -->

        </q-form>
    </q-card-section>
    <q-dialog v-model="holdingFeedbackDialog" position="bottom">
      <q-card class="full-width">
        <q-card-section>
          <div class="row justify-center">
            <span class="q-pb-sm text-subtitle2">Your feedback has already been recorded. Please try again after sometimes.</span>
            <div class="col-md-6 col-xs-12">
              <q-btn
                rounded
                class="full-width"
                color="primary"
                label="Close"
                icon="check"
                @click="onClose"
              />
            </div>
          </div>          
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api, fetcher } from 'boot/axios'
import { useRouter, useRoute } from "vue-router";
import moment from 'moment-timezone';


export default defineComponent({
  name: 'UserFeedback',
  components: {},

  setup() {
    const $q = useQuasar()
    const $store = useStore()
    const $router = useRouter();
    const $route = useRoute();

    if ($route.query.facility) {
      api
        .get('/facilities/' + $route.query.facility)
        .then(response => {
          if (response.data) $store.dispatch('general/setFacilityName', response.data.name)
          else {
            $store.dispatch('general/setFacilityName', '')
            $router.push({ name: "qrcodeerror" })
          }
        })
        .catch(error => {
          $store.dispatch('general/setFacilityName', '')
          $router.push({ name: "qrcodeerror" })
          console.error(error)
        })
    }
    else {
      $store.dispatch('general/setFacilityName', '')
      $router.push({ name: "qrcodeerror" })
    }
    let facilityName = computed(() => $store.getters['general/facilityName'])

    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
    })

    const userFeedbackObj = reactive({
        'facility': null,
        'userType': null,
        'userSubType': null,
        'reviewType': ''
    })

    const userTypeList = ref([
        'Patient',
        'Bystander',
        'Doctor',
        'Nurse',
        'Other',
    ]);

    const userForm = ref(null)
    const happyFace = ref(require('../assets/happy-face.png'))
    const sadFace = ref(require('../assets/sad-face.png'))
    const holdTime = ref(900000)
    const holdingFeedbackDialog = ref(false);

    let lastFeedback = computed(() => $store.getters['general/lastFeedback'])

    const getUserFeedback = (event) => {
      userForm.value.validate().then(isValidated => {
        if (isValidated) {
          // let now = new moment().tz('Asia/Kolkata');
          let now = + new Date();
          // let sendableTime = now.subtract(15, 'minutes')
          // if (!lastFeedback.value.timestamp || sendableTime.isAfter(lastFeedback.value.timestamp)) {
          if (!lastFeedback.value.timestamp || (now - lastFeedback.value.timestamp) > holdTime.value) {
            userFeedbackObj.reviewType = event;
            userFeedbackObj.facility = $route.query.facility;
            api
              .post('/feedbacks', userFeedbackObj)
              .then(response => {
                // console.log("resp: ", response)
                const feedbackId = response.data.id;
                $store.dispatch('general/setLastFeedback', { feedbackId, timestamp: now })
                if(response.status == 200) {
                  if (event == 'bad'){
                    $router.push({
                      name: "sadfeedback",
                      query: { 
                        key: event,
                        feedbackId: feedbackId,
                       }
                    })
                  } 
                  if (event == 'good'){
                    $router.push({
                      name: "happyfeedback",
                      query: {
                        key: event,
                        feedbackId: feedbackId,
                      }
                    })
                  }
                }
              })
              .catch(error => {
                console.error(error)
              })
          }
          else {
            holdingFeedbackDialog.value = true;
            // console.log("Your feedback has already been recorded. Please come after sometimes.")
          }
          
        }
        
      })
    }

    const onClose = () => {
      holdingFeedbackDialog.value = false;
    }

    // Testing code for Web Push Notification
    // const enableNotification = () => {
    //   const subscriptionId = ref(localStorage.getItem("pushSubscriptionId"))
    //   api
    //     .get('/notifier/' + subscriptionId.value)
    //     .then(response => {
    //       console.log("response, notifier: ", response)
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    // }
    // End of testing code for Web Push Notification

    return {
        userFeedbackObj,
        userTypeList,
        happyFace,
        sadFace,
        facilityName,
        userForm,
        holdingFeedbackDialog,
        onClose,
        getUserFeedback,
        enableNotification,
    }
  }
})
</script>
<style lang="sass" scoped>
.happy-card
  width: 7.8rem
  height: 7.8rem
  margin: .2em
  border: 3px solid rgba(147, 219, 112, 0.6)
.sad-card
  width: 7.8rem
  height: 7.8rem
  margin: .2em
  border: 3px solid rgba(224, 189, 199)
</style>
