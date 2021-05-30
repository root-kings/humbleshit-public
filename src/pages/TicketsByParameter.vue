<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6">
          {{ parameterData.name }}
        </div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-expansion-item
          v-for="issue in issues"
          :key="issue._id"
          :icon="issue.statusAcknowledged ? '' : 'eva-email-outline'"
          :label="issue.ticket.facility.name"
          :caption="$filters.formatDate(issue.ticket.dateSubmitted)"
          @show="acknowledgeIssue(issue)"
        >
          <q-card>
            <q-card-section>
              Janitor Description
              <div class="text-caption">{{ issue.description }}</div>
            </q-card-section>

            <q-item>
              <q-item-section>
                <q-item-label>
                  {{ issue.ticket.raisedBy.name }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  type="a"
                  :href="`tel:${issue.ticket.phone}`"
                  color="primary"
                  flat
                  round
                  icon="eva-phone-outline"
                />
              </q-item-section>
            </q-item>

            <q-card-section v-if="issue.escalateDescription">
              Manager Description
              <div class="text-caption">
                {{ issue.escalateDescription }}
              </div>
            </q-card-section>

            <q-card-section v-if="issue.media.length">
              <div class="q-gutter-xs">
                <q-avatar
                  v-for="(m, idx) in issue.media"
                  :key="idx"
                  size="32px"
                  class="col"
                  rounded
                  @click="showImage(m.path)"
                >
                  <q-img :ratio="1" basic :src="m.path">
                    <template #error>
                      <q-icon name="warning" color="warning" />
                    </template>
                  </q-img>
                </q-avatar>
              </div>
            </q-card-section>

            <q-card-actions class="q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                  rounded
                  :outline="!canEscalate"
                  class="full-width"
                  :color="canEscalate ? 'negative' : 'grey'"
                  label="ESCALATE"
                  icon="forward"
                  :disable="!canEscalate"
                  @click="escalate(issue)"
                />
              </div>

              <div class="col-6">
                <q-btn
                  rounded
                  class="full-width"
                  color="positive"
                  label="CLOSE"
                  icon="check"
                  @click="close(issue)"
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <q-dialog v-model="imageDialog" position="bottom">
      <q-card>
        <q-img :src="enlargedImage" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data() {
    return {
      slide: 1,
      parameter: null,
      issues: [],
      parameterData: {
        name: null
      },
      imageDialog: false,
      enlargedImage: null,
      description: null
      // raisedBy: null
    }
  },

  computed: {
    canEscalate() {
      return !!this.user.reportsTo
    },

    user() {
      return this.$store.getters['auth/user']
    }
  },

  mounted() {
    this.$store.dispatch('general/setTitle', 'Ticket Details')

    this.parameter = this.$route.params.id
    this.fetchTickets()
  },

  methods: {
    acknowledgeIssue(issue) {
      if (!issue.statusAcknowledged) {
        // this.$q
        //   .dialog({
        //     title: 'Confirm',
        //     message: 'Do you want to Acknowledge the Ticket ?',
        //     ok: true,
        //     cancel: true
        //   })
        //   .onOk(() => {
        this.$q.loading.show()
        api
          .put('/tickets/acknowledge', { issues: [issue._id] })
          .then(response => {
            this.fetchTickets()
          })
          .catch(err => console.error(err))
          .finally(() => {
            this.$q.loading.hide()
          })
        // })
      }
    },

    escalate(issue) {
      this.$q
        .dialog({
          title: 'Enter Description',
          // message: 'You are about to escalate this issue, make sure',
          prompt: {
            model: '',
            type: 'text' // optional
          },
          ok: true,
          cancel: true
        })
        .onOk(description => {
          console.log(description)
          this.$q.loading.show()
          api
            .put('/tickets/escalate', { issues: [issue._id], description })
            .then(response => {
              this.fetchTickets()
            })
            .catch(err => console.error(err))
            .finally(() => {
              this.$q.loading.hide()
            })
        })
    },

    close(issue) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you want to Close the Ticket?',
          ok: true,
          cancel: true
        })
        .onOk(() => {
          this.$q.loading.show()
          api
            .put('/tickets/resolve', { issues: [issue._id] })
            .then(response => {
              this.fetchTickets()
            })
            .catch(err => console.error(err))
            .finally(() => {
              this.$q.loading.hide()
            })
        })
    },

    fetchTickets() {
      this.$q.loading.show()
      api
        .get(
          process.env.API +
            '/tickets/unresolved/by-parameter?parameter=' +
            this.parameter
        )
        .then(response => {
          this.issues = response.data.issues
          this.parameterData = response.data.parameter
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    showImage(image) {
      this.enlargedImage = image
      this.imageDialog = true
    }
  }
}
</script>
