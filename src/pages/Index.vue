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
                      @click="getUserFeedback('happy')"
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
                    @click="getUserFeedback('sad')"
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

export default defineComponent({
  name: 'UserFeedback',
  components: {},

  setup() {
    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
    })

    const userFeedbackObj = ref({
        'userType': null,
        'otherUserType': null,
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

    const getUserFeedback = (event) => {
        if (event == 'sad') window.location = "/#/sadfeedback";
        if (event == 'happy') window.location = "/#/happyfeedback";
    }

    const $q = useQuasar()
    const $store = useStore()

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
