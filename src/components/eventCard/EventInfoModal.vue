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

const isDeleting = ref(false)

const closeModal = async (modalId: string) => {
  setTimeout(() => {
    isDeleting.value = false
  }, 500)
  const closeButton = document.getElementById(modalId + 'CloseBtn') as HTMLElement
  if (closeButton) {
    closeButton.click()
  }
  await nextTick();
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
  closeModal(props.modalId)
  props.showAlert(DELETED_SUCCESS_MSG)
  props.fetchEvents()
}

const handleDeleteButtonClick = () => {
  if (isDeleting.value) {
    confirmDelete() // Подтверждение удаления
  } else {
    isDeleting.value = true // Переключаем режим
  }
}

const editEvent = () => {
  console.log('EVENT EDIT:', props.eventData.eventName, props.eventData.id)
  closeModal(props.modalId)
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
          <strong>Description:</strong> {{ eventData.description }}<br />
          <strong>Date:</strong> {{ eventData.date }} - {{ eventData.time.substring(0, 5) }}<br />
          <strong>Location:</strong> {{ eventData.location }}
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
          <button type="button" class="btn btn-primary" @click="editEvent">Edit Event</button>
          <div v-if="isDeleting" class="text-danger text-center">
            <strong>Are you sure you want to delete this event?</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
