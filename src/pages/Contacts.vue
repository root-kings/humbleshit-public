<template>
  <q-page padding>
    <div v-if="loading" class="row q-col-gutter-md">
      <q-list class="col-12">
        <SListItem v-for="i in 5" :key="i" />
      </q-list>
    </div>

    <div v-else-if="empty" class="row q-col-gutter-md">
      <div class="col-12">
        <EmptyTile />
      </div>
    </div>

    <div v-else class="row q-col-gutter-md">
      <div v-for="category in contacts" :key="category.name" class="col-12">
        <q-list bordered class="bg-white rounded-borders">
          <q-item-label header>{{ category.categoryName }}</q-item-label>
          <q-item v-for="contact in category.contacts" :key="contact._id">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ contact.name }}
              </q-item-label>
              <q-item-label caption>
                {{ contact.occupation }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                type="a"
                :href="`tel:${contact.phone}`"
                color="primary"
                flat
                round
                icon="eva-phone-outline"
              />
            </q-item-section>

            <q-item-section side>
              <q-btn round flat icon="eva-more-vertical-outline">
                <q-menu auto-close>
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section side>
                        <q-icon name="eva-message-circle-outline" />
                      </q-item-section>
                      <q-item-section> Message </q-item-section>
                    </q-item>
                    <q-item clickable @click="showEditDialog(contact)">
                      <q-item-section side>
                        <q-icon name="eva-edit-outline" />
                      </q-item-section>
                      <q-item-section> Edit </q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteContact(contact)">
                      <q-item-section side>
                        <q-icon name="eva-trash-2-outline" color="negative" />
                      </q-item-section>
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab round icon="add" color="accent" @click="showCreateDialog" />
    </q-page-sticky>

    <q-dialog v-model="dialog" position="bottom">
      <q-card class="full-width">
        <q-card-section class>
          <q-input
            v-model="newContact.name"
            outlined
            dense
            label="Name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            v-model="newContact.phone"
            outlined
            dense
            label="Phone"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your phone number'
            ]"
            mask="(###) ### - ####"
          />
          <q-input
            v-model="newContact.occupation"
            outlined
            dense
            label="Occupation"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-select
            v-model="newContact.category"
            outlined
            dense
            :options="categories"
            label="Department"
            lazy-rules
            :rules="[
              val => (val !== null && val !== '') || 'Please enter the category'
            ]"
          />

          <q-btn label="SAVE" type="submit" color="primary" @click="onSubmit" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { api, fetcher } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import useSWRV from 'swrv'

import SListItem from 'components/skeletons/SListItem'
import EmptyTile from 'components/EmptyTile'

export default defineComponent({
  components: {
    SListItem,
    EmptyTile
  },

  setup() {
    onMounted(() => {
      $store.dispatch('general/setTitle', 'Contacts')
    })

    let newContact = reactive({
      name: null,
      category: null,
      _id: null,
      phone: null,
      occupation: null
    })

    let isEdit = ref(false)

    const categories = ref([
      'Water',
      'Inventory',
      'Consumables',
      'Electronics',
      'Electrical',
      'Facilities',
      'Infrastructure'
    ])

    let dialog = ref(false)

    const $q = useQuasar()
    const $store = useStore()

    let {
      data: allContacts,
      error: contactError,
      mutate: mutateContacts
    } = useSWRV('/contacts', fetcher)

    let loading = computed(() => !allContacts.value)

    let empty = computed(() => !loading.value && !allContacts.value.length)

    let contacts = computed(() => {
      if (loading.value) return []
      else {
        let grouped = []

        categories.value.forEach(cat => {
          let items = allContacts.value.filter(
            contact => contact.category == cat
          )

          if (items.length)
            grouped.push({
              categoryName: cat,
              contacts: items
            })
        })

        return grouped
      }
    })

    function showCreateDialog() {
      newContact.value = {
        name: null,
        category: null,
        _id: null,
        phone: null,
        occupation: null
      }
      isEdit.value = false
      dialog.value = true
    }

    function showEditDialog(contact) {
      newContact.value = contact
      dialog.value = true
      isEdit.value = true
    }

    function onSubmit() {
      if (isEdit.value) {
        api
          .put('/contacts/' + newContact.value._id, newContact)
          .then(response => {
            mutateContacts()
            dialog.value = false
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        api
          .post('/contacts', newContact)
          .then(response => {
            mutateContacts()
            dialog.value = false
          })
          .catch(error => {
            console.error(error)
          })
      }
    }

    function deleteContact(contact) {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to delete the contact?',
        ok: true,
        cancel: true
      }).onOk(() => {
        api
          .delete(`/contacts/${contact._id}`)
          .then(response => {
            mutateContacts()
          })
          .catch(error => {
            console.error(error)
          })
      })
    }

    return {
      contacts,
      loading,
      empty,

      newContact,
      categories,

      dialog,
      showCreateDialog,
      showEditDialog,
      onSubmit,
      deleteContact
    }
  }
})
</script>

<style scoped>
a:-webkit-any-link {
  text-decoration: none;
}
</style>
