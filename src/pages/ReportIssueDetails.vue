<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div v-for="issue in issueDetails" :key="issue._id" class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-weight-bol">{{ issue.name }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-input
              :ref="'description'"
              v-model="issue.description"
              filled
              autogrow
              type="textarea"
              :rules="[val => !!val]"
              placeholder="Enter Issue Details"
            />

            <div class="row q-col-gutter-sm">
              <div class="col">
                <q-btn
                  rounded
                  label="Capture Image"
                  icon="eva-image-outline"
                  color="primary"
                  class="full-width"
                  no-caps
                  @click="captureImage(issue)"
                />
              </div>
              <div class="col">
                <!-- <q-btn
                flat
                size="md"
                :label="$t('label_btn_recordVoice')"
                @click="toggleRecording(issue)"
                :icon="recording ? 'stop' : 'mic'"
                class="full-width"
                :color="recording ? 'red' : ''"
              />
            -->
                <q-btn
                  rounded
                  outline
                  label="Record Voice"
                  icon="eva-mic-outline"
                  class="full-width"
                  color="grey"
                  no-caps
                  @click="
                    $q.notify({ message: 'Premium feature!', color: 'orange' })
                  "
                >
                  <q-badge color="orange" floating transparent>
                    <q-icon name="stars" color="white" />
                  </q-badge>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section v-if="issue.media.length" class="q-pb-none">
            <q-avatar
              v-for="(file, idx) in issue.media"
              :key="idx"
              size="128px"
              rounded
              class="q-mr-sm q-mb-sm"
            >
              <q-img v-if="file.type.includes('image')" :src="file.path" />
              <q-icon v-else name="music" />

              <q-badge
                class="q-pa-none"
                floating
                color="red"
                @click="removeFile(issue, idx)"
              >
                <q-icon name="close" size="sm" />
              </q-badge>
            </q-avatar>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="eva-arrow-forward-outline"
        color="primary"
        @click="saveReportAndSubmit"
      />
    </q-page-sticky>

    <q-dialog v-model="captureDialog" maximized>
      <ImageCapture @capture="handleCapture" />
    </q-dialog>
  </q-page>
</template>
<script>
import ImageCapture from 'components/ImageCapture'
import imageCompression from 'browser-image-compression'
import { api } from 'boot/axios'

export default {
  name: 'PageIssueDetails',

  components: {
    ImageCapture
  },

  data() {
    return {
      imageSrc: '',
      issueDetails: [],
      tempAudio: null,
      recording: false,

      captureDialog: false,
      captureIssue: null
    }
  },

  computed: {
    report() {
      return this.$store.getters['reports/report']
    },

    issues() {
      return this.report.parameters.filter(p => !p.statusOk)
    }
  },

  mounted() {
    this.$store.dispatch('general/setTitle', 'Issue Details')
    this.initDetails()
  },

  methods: {
    initDetails() {
      this.issueDetails = this.issues.map(issue => ({
        ...issue,
        parameter: issue._id,
        media: [],
        description: ''
      }))
    },

    captureImage(issue) {
      this.captureIssue = issue
      this.captureDialog = true
    },

    // toggleRecording(issue) {
    //   if (!this.recording) this.startRecordVoice()
    //   else this.stopRecordVoice(issue)
    // },
    //
    // startRecordVoice() {
    //   this.recording = true
    //   this.tempAudio = new Media(
    //     'voice.mp3',
    //     () => alert('recorded'),
    //     () => alert('failed')
    //   )
    //   this.tempAudio.startRecord()
    // },

    // stopRecordVoice(issue) {
    //   this.recording = false
    //   this.tempAudio.stopRecord()
    //   const mimeType = 'audio/mp3'
    //   fetch('voice.mp3')
    //     .then(response => response.arrayBuffer())
    //     .then(buf => {
    //       let file = new File([buf], 'voice.mp3', { type: mimeType })
    //       vm.uploadFile(issue, file)
    //     })
    // },

    async handleCapture(blob) {
      console.log({ blob })

      let file = new File([blob], 'capture.jpg', { type: blob.type })
      file = await imageCompression(file, {
        maxSizeMB: 0.05
      })
      this.uploadFile(file)
      this.captureDialog = false
    },

    uploadFile(file) {
      this.$q.loading.show()
      var formdata = new FormData()
      formdata.append('media', file)
      api
        .post('/uploads', formdata, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
          let issueIdx = this.issueDetails.indexOf(this.captureIssue)
          this.issueDetails[issueIdx].media = response.data.concat(
            this.issueDetails[issueIdx].media
          )
          this.captureIssue = null
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    removeFile(issue, idx) {
      let issueIdx = this.issueDetails.indexOf(issue)
      let file = this.issueDetails[issueIdx].media[idx]

      this.$q.loading.show()

      api
        .delete('/uploads/' + file.name)
        .then(response => {
          this.issueDetails[issueIdx].media.splice(idx, 1)
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    validate() {
      let hasError = false
      for (let i = 0; i < this.$refs.description.length; i++) {
        let r = this.$refs.description[i]

        r.validate()
        hasError = hasError || r.hasError
      }
      return !hasError
    },

    saveReportAndSubmit() {
      if (this.validate()) {
        let parameters = this.report.parameters.map(p => ({
          ...p,
          parameter: p._id
        }))

        this.$store.dispatch('reports/saveReport', {
          ...this.report,
          parameters,
          issueDetails: this.issueDetails
        })
        this.$router.replace('/reports/submit')
      } else {
        this.$q.notify({ message: 'Please enter data!', type: 'negative' })
      }
    }
  }
}
</script>
