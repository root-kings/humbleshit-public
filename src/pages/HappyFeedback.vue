<template>
  <q-page padding>
    <q-card-section>
      <div class="q-mb-md text-center text-h4">Rate this washroom</div>

      <div class="q-mt-md text-center text-h6 text-weight-regular">
        AIIMS Patna. Washroom 7
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
      <div class="q-mt-md text-center text-h6 text-weight-regular">
        How Good was your Experience?
      </div>
      <div class="container q-mt-md">
        <div class="q-pa-md">
          <div class="q-gutter-y-md column">
            <q-rating
              v-model="ratingModel"
              size="3.5em"
              color="green-5"
              icon="star_border"
              icon-selected="star"
            />
          </div>
        </div>
      </div>

      <div class="q-mt-md text-center text-p text-weight-regular">
        Tell us more
        <div class="q-pa-md" style="max-width: 300px">
          <q-input v-model="text" filled autogrow />
        </div>
      </div>

      <div class="q-pa-md">
        <q-btn-group spread>
          <q-btn color="primary" label="Submit" icon-right="send" />
        </q-btn-group>
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PublicFeedback',
  components: {},

  setup() {
    onMounted(() => {
      $store.dispatch('general/setTitle', 'humbleShit')
    })

    let color1 = ref([''])
    let isCardTouched = ref([false])
    const color2 = ref([''])
    const color3 = ref([''])
    const color4 = ref([''])
    const color5 = ref([''])
    const color6 = ref([''])
    const color7 = ref([''])
    const color8 = ref([''])

    const userTypeList = ref([
      'Patient',
      'Bystander',
      'Doctor',
      'Nurse',
      'Other...'
    ])

    const happyFace = ref(require('../assets/happy-face.jpg'))
    const sadFaceDisabled = ref(require('../assets/sad-face-disabled.jpg'))

    const getUserFeedback = event => {
      window.location = '/#/happyfeedback'
    }

    const selectCard = (val, id) => {
      if (val[1] == 'red')
        document.querySelector('#feedback-card' + id).classList.add('active')
      else
        document.querySelector('#feedback-card' + id).classList.remove('active')
    }

    const $q = useQuasar()
    const $store = useStore()

    return {
      isCardTouched,
      happyFace,
      sadFaceDisabled,
      getUserFeedback,
      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
      color7,
      color8,
      selectCard,
      ratingModel: 1,
      text: ''
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 200px
    height: 7rem
    margin: .2em
    background: rgba(243, 230, 242, 0.5)
    border: 3px solid rgba(112, 128, 144, 0.8)

.active
    border-color: rgba(102, 63, 83, 0.5)
    background: rgba(224, 189, 199, 0.6)
.label-width
    width: 10rem

.align-items-center
    align-items: center
.justify-content-center
    justify-content: center
.d-none
    display: none
.card-checkbox
    height: 1.5rem
.submit-btn
    align-items: center
    justify-content: center
</style>
