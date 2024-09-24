<script setup lang="ts">
import { type EventCardProps } from './EventCard.vue'
import { nextTick, ref } from 'vue'

const props = defineProps<{
  eventData: EventCardProps
  modalId: string
  fetchEvents: () => void
  showAlert: (message: string) => void
}>()

const DELETED_SUCCESS_MSG = 'Event deleted successfully'
const EDIT_SUCCESS_MSG = 'Event edited successfully'

const isDeleting = ref(false)
const isEditing = ref(false)

const editedEvent = ref<EventCardProps>({
  ...props.eventData
})

const closeModal = async (modalId: string) => {
  setTimeout(() => {
    isDeleting.value = false
    isEditing.value = false
  }, 500)
  const closeButton = document.getElementById(modalId + 'CloseBtn') as HTMLElement
  if (closeButton) {
    closeButton.click()
  }
  await nextTick()
}

const handleDeleteButtonClick = () => {
  if (isDeleting.value) {
    confirmDelete()
  } else {
    isDeleting.value = true
  }
}

const confirmDelete = async () => {
  const response = await fetch(`/api/manage/delete/${props.eventData.id}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    console.log(DELETED_SUCCESS_MSG)
  } else {
    console.error('Failed to delete event: ' + response.body)
  }
  await closeModal(props.modalId)
  props.showAlert(DELETED_SUCCESS_MSG)
  props.fetchEvents()
}

const handleEditButtonClick = () => {
  if (isEditing.value) {
    confirmEditing()
  } else {
    isEditing.value = true
  }
}

const confirmEditing = async () => {
  const dateTime = `${editedEvent.value.date}T${editedEvent.value.time}`

  const formData = {
    eventName: editedEvent.value.eventName,
    hostName: editedEvent.value.hostName,
    dateOfEvent: dateTime,
    location: editedEvent.value.location,
    maxVisitors: editedEvent.value.maxVisitors,
    description: editedEvent.value.description
  }

  const response = await fetch(`/api/manage/edit/${props.eventData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  if (response.ok) {
    console.log('Event edited successfully!')
    props.fetchEvents()
    props.showAlert(EDIT_SUCCESS_MSG)

    await closeModal(props.modalId)
  } else {
    console.error('Failed to edit event: ' + response.body)
  }
}
</script>

<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="eventInfoModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header" :id="modalId + 'Header'">
          <h5 class="event-title mb-0 text-start" id="eventInfoModalLabel">
            {{ eventData.eventName }}<br />
            <small class="text-muted">Hosted by {{ eventData.hostName }}</small>
          </h5>
          <button
            type="button"
            class="btn-close"
            :id="modalId + 'CloseBtn'"
            @click="closeModal(modalId)"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body text-start">
          <div v-if="isEditing">
            <div class="mb-3">
              <label class="form-label">Event Name</label>
              <input v-model="editedEvent.eventName" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Host Name</label>
              <input v-model="editedEvent.hostName" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Date</label>
              <input v-model="editedEvent.date" type="date" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Time</label>
              <input v-model="editedEvent.time" type="time" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Location</label>
              <input v-model="editedEvent.location" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Max Visitors</label>
              <input v-model="editedEvent.maxVisitors" type="number" min="0" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="editedEvent.description" class="form-control"></textarea>
            </div>
          </div>

          <div v-else>
            <strong>Description:</strong> {{ eventData.description }}<br />
            <strong>Date:</strong> {{ eventData.date }} - {{ eventData.time.substring(0, 5) }}<br />
            <strong>Location:</strong> {{ eventData.location }}
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            v-if="isDeleting"
            @click="isDeleting = false"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-danger" @click="handleDeleteButtonClick">
            {{ isDeleting ? 'Confirm' : 'Delete Event' }}
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            v-if="isEditing"
            @click="isEditing = false"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="handleEditButtonClick">
            {{ isEditing ? 'Submit' : 'Edit Event' }}
          </button>
          <div v-if="isDeleting" class="text-danger text-center">
            <strong>Are you sure you want to delete this event?</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
