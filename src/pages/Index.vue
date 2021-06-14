<template>
  <q-page padding>
    <q-card-section>
        <div class="q-mb-md text-center text-h4">Rate this washroom</div>

        <div class="q-mt-md text-center text-h6 text-weight-regular">
            AIIMS Patna. Washroom 7
        </div>
    </q-card-section>

    <q-card-section>
        <div class="q-mt-md text-dark text-weight-medium">
            What defines you best?
        </div>
        <q-select
            v-model="userFeedbackObj.userType"
            outlined
            :options="userTypeList"
            label="I am"
            class="q-mb-md"
            :rules="[val => (val && val.length > 0) || 'Please select an option']"
        />
        <q-input v-if="userFeedbackObj.userType == 'Other...'"
            v-model="userFeedbackObj.otherUserType"
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
        
    </q-card-section>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api, fetcher } from 'boot/axios'
import { useRouter } from "vue-router";
import moment from 'moment-timezone';
// import useSWRV from 'swrv'


export default defineComponent({
  name: 'UserFeedback',
  components: {},

  setup() {
    const $q = useQuasar()
    const $store = useStore()
    const $router = useRouter();
    // const $router = useRouter

    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
    })

    const userFeedbackObj = reactive({
        'facility': null,
        'userType': null,
        'otherUserType': null,
        'reviewType': ''
    })

    const userTypeList = ref([
        'Patient',
        'Bystander',
        'Doctor',
        'Nurse',
        'Other...',
    ]);

    const happyFace = ref(require('../assets/happy-face.png'))
    const sadFace = ref(require('../assets/sad-face.png'))

    let lastFeedback = computed(() => $store.getters['general/lastFeedback'])

    const getUserFeedback = (event) => {
      let now = new moment().tz('Asia/Kolkata');
      let sendableTime = now.subtract(15, 'minute')
      if (!lastFeedback.value.timestamp || sendableTime.isAfter(lastFeedback.value.timestamp)) {
        // allowSending
      }
      else {
        // show error
      }

        userFeedbackObj.reviewType = event;
        // if (event == 'bad'){
        //   $router.push({
        //     name: "sadfeedback",
        //     query: { 
        //       key: event,
        //       feedbackId: 'feedback_id_bad',
        //       }
        //   })
        // } 
        // if (event == 'good'){
        //   $router.push({
        //     name: "happyfeedback",
        //     query: {
        //       key: event,
        //       feedbackId: 'feedback_id_good',
        //     }
        //   })
        // }
        api
          // .post('/feedbacks', userFeedbackObj)
          .get('/feedbacks/60c5ca2468e16bd52c1de51f') // good
          // .get('/feedbacks/60c60214ca6234f8e76385e8') // bad
          .then(response => {
            console.log("resp: ", response)
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


    return {
        userFeedbackObj,
        userTypeList,
        happyFace,
        sadFace,
        getUserFeedback,
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
