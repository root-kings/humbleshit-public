<template>
  <q-page padding>
    <q-card-section>
      <div class="row justify-center">
        <q-card
          class="my-card"
          flat
          bordered
        >
          <div class="q-mt-md container text-center">
            <span class="q-mx-md">
              <q-img
                height="8rem"
                width="8rem"
                :src="thankYouPlane"
              />
            </span>
          </div>
          <div class="q-mt-sm q-pa-sm text-center text-dark text-h4 text-weight-light">
            Thank you for your feedback!
          </div>
          <div class="q-mt-sm q-pa-sm text-center text-dark text-subtitle1 text-weight-regular">
            {{ thankYouMessage }}
          </div>
        </q-card>
      </div>
      <div class="row justify-center">
        <div class="col-12 q-pt-md">
          <q-form>
            <div v-if="reviewType == 'bad'" class="q-pa-xs">
              <q-input
                v-model="detailedSadReview"
                outlined
                label="Tell us more"
                type="textarea"
              />
            </div>
            <div v-if="reviewType == 'good'" class="q-pa-xs">
              <q-input
                v-model="detailedGoodReview"
                outlined
                label="Tell us more about your experience"
                type="textarea"
              />
            </div>
            <div v-if="reviewType == 'bad'" class="row text-center q-pt-md">
              <div class="col-12 q-pa-xs">
                <q-btn
                  rounded
                  class="full-width"
                  label="Submit"
                  color="primary"
                  icon="check"
                  @click="getFollowUp('submit')"
                />
              </div>
              <div class="col-6 q-pa-xs">
                <q-btn
                  rounded
                  class="full-width"
                  label="Call"
                  color="primary"
                  icon="eva-phone-outline"
                  @click="contactHousekeeping"
                />
                <span class="text-caption text-weight-regular text-blue-grey-5">to contact Housekeeping</span>
              </div>

              <div class="col-6 q-pa-xs">
                <q-btn
                  rounded
                  class="full-width"
                  color="positive"
                  label="Follow Up"
                  icon="eva-message-circle-outline"
                  @click="getFollowUp('followUp')"
                />
                <span class="text-caption text-weight-regular text-blue-grey-5">to get SMS updates</span>
              </div>
            </div>
            <div v-if="reviewType == 'good'" class="row q-pt-md justify-center">
              <div class="col-md-6 col-sm-6 col-xs-12 q-pa-xs">
                <q-btn
                  rounded
                  class="full-width"
                  label="Submit"
                  color="primary"
                  icon="check"
                  @click="onSave"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </q-card-section>
    <q-dialog v-model="callDialog" position="bottom">
      <q-card class="full-width">
        <q-card-section class="q-pt-md q-pb-md">
          <div class="row justify-center">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                Sahas
              </q-item-label>
              <q-item-label caption>
                Supervisor
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                type="a"
                :href="`tel:9380546475`"
                color="primary"
                flat
                round
                icon="eva-phone-outline"
              />
            </q-item-section>
          </div>          
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="submitDialog" position="bottom">
      <q-card class="full-width">
        <q-card-section>
          <div class="row justify-center">
            <span class="q-pb-sm text-subtitle2">{{ finalMessage }}</span>
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
import { Vue, defineComponent, ref, reactive, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { api, fetcher } from 'boot/axios'

export default defineComponent({
  name: 'ThankYou',


  setup() {

    const $route = useRoute();
    const $store = useStore()

    let reviewType = computed(() => {
      return $route.query.key
    })

    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
    })

    let detailedGoodReview = ref('')
    let detailedSadReview = ref('')
    let thankYouMessage = ref('')
    let submitDialog = ref(false);
    let callDialog = ref(false);
    const thankYouPlane = ref(require('../assets/paper-plane-100.png'))
    if (reviewType.value == 'good') thankYouMessage.value = 'Your review has been submitted to the administration.';
    else if (reviewType.value == 'bad') thankYouMessage.value = 'Your issue #' + $route.query.feedbackId + ' has been submitted to the administration';
    let finalMessage = ref('');
    let followUp = ref(false)

    const finalSubmit = (event) => {
      // console.log(detailedSadReview.value.length)
      if (detailedSadReview.value.trim().length) {
        api
          .put('/feedbacks/' + $route.query.feedbackId, { extraInfo: detailedSadReview.value.trim(), followUp: followUp.value })
          .then(response => {
            detailedSadReview.value = ''
            // console.log('thankyou, bad: ', response)
          })
          .catch(error => {
            console.error(error)
          })
      }
      if(event != 'call') submitDialog.value = true;
    }

    const getFollowUp = (event) => {
      if (event == 'submit') {
        finalMessage.value = "Thanks! your response has been recorded."
        finalSubmit('')
      }
      if (event == 'followUp') {
        finalMessage.value = "Thanks! your response has been recorded. You will get a message when we get it resolved."
        followUp.value = true;
        finalSubmit('')
      }
      if (event == 'call') {
        finalSubmit('call')
      }
    }
    const contactHousekeeping = () => {
      callDialog.value = true;
      getFollowUp('call')
    }

    const onSave = () => {
      // console.log(detailedGoodReview.value.length)
      if (detailedGoodReview.value.trim().length) {
        api
          .put('/feedbacks/' + $route.query.feedbackId, { extraInfo: detailedGoodReview.value.trim() })
          .then(response => {
            submitDialog.value = true;
            detailedGoodReview.value = ''
            finalMessage.value = "Thanks! your response has been recorded."
            // console.log('thankyou, good: ', response)
          })
          .catch(error => {
            console.error(error)
          })

      }
    }

    const onClose = () => {
      submitDialog.value = false;
    }

    return {
      reviewType,
      detailedSadReview,
      detailedGoodReview,
      thankYouPlane,
      thankYouMessage,
      submitDialog,
      callDialog,
      finalMessage,
      contactHousekeeping,
      getFollowUp,
      onSave,
      onClose
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
    width: 100%
    height: 23rem
    margin: .2em
    background: rgb(176, 196, 222, 0.3) // Green
    border: 2px solid rgba(112, 128, 144, 0.8)
</style>
