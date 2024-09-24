<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import EventCard, { type EventCardProps } from '@/components/eventCard/EventCard.vue'

const eventName = ref('')
const hostName = ref('')
const dateOfEvent = ref('')
const location = ref('')
const maxVisitors = ref('')
const description = ref('')

const errors = ref<Record<string, string>>({})

const maxCharCount = 1000
const alertShownTimeMs = 3000
const CREATED_SUCCESS_MSG = 'Event created successfully'

const charCount = computed(() => description.value.length)
const isFormValid = computed(() => charCount.value <= maxCharCount)

const alertVisible = ref(false)
const alertMessage = ref('')

const showAlert = (message: string) => {
  alertMessage.value = message
  alertVisible.value = true
  setTimeout(() => {
    const alertResultButton = document.getElementById('alertResultCloseBtn') as HTMLElement
    if (alertResultButton) {
      alertResultButton.click()
    }
    setTimeout(() => {
      alertVisible.value = false
    }, 500)
  }, alertShownTimeMs)
}

const submitForm = async () => {
  const formData = {
    eventName: eventName.value,
    hostName: hostName.value,
    dateOfEvent: dateOfEvent.value,
    location: location.value,
    maxVisitors: maxVisitors.value,
    description: description.value
  }

  try {
    const response = await fetch('/api/manage/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      const result = await response.json()

      errors.value = {}

      const closeCreateModal = document.querySelector('#createEventModal .btn-close') as HTMLElement
      if (closeCreateModal) {
        closeCreateModal.click()
      }

      // TODO: make a single object & store that fields
      eventName.value = ''
      hostName.value = ''
      dateOfEvent.value = ''
      location.value = ''
      maxVisitors.value = ''
      description.value = ''
      errors.value = {}

      showAlert(CREATED_SUCCESS_MSG)
    } else {
      errors.value = await response.json()
    }
  } catch (error) {
    // TODO ADD SOMETHING TO FRONTEND FOR BAD RESPONSE
    console.error(error)
  }
}

const loadedEvents = ref<EventCardProps[]>([])
const fetchEvents = async () => {
  try {
    const response = await fetch('api/manage/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json()
      loadedEvents.value = data.map((event: any) => ({
        id: event.id,
        eventName: event.eventName,
        hostName: event.hostName,
        date: event.dateOfEvent.split('T')[0],
        time: event.dateOfEvent.split('T')[1],
        location: event.location,
        maxVisitors: event.maxVisitors,
        description: event.description
      }))
    } else {
      console.error('Error getting data')
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <div
    v-if="alertVisible"
    id="alertResult"
    class="alert alert-success alert-dismissible fade show text-center"
    role="alert"
  >
    {{ alertMessage }}
    <button
      type="button"
      id="alertResultCloseBtn"
      class="btn-close"
      aria-label="Close"
      data-bs-dismiss="alert"
    ></button>
  </div>

  <div class="container-fluid px-5 manage-page-container">
    <h1 class="mb-2">Event Management</h1>
    <p class="mb-3 text-center">
      You can manage events hosted by you or create a new one - your choose.
    </p>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEventModal">
      Create Event
    </button>

    <div class="card-row">
      <div v-for="event in loadedEvents" :key="event.eventName" class="card-column">
        <EventCard :event-data="event" :fetch-events="fetchEvents" :show-alert="showAlert" />
      </div>
    </div>

    <div
      class="modal fade"
      id="createEventModal"
      tabindex="-1"
      aria-labelledby="createEventModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createEventModalLabel">Create Event</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="eventName"
                  v-model="eventName"
                  max="255"
                  placeholder="eventName"
                  required
                />
                <label for="eventName">Event name</label>
                <div v-if="errors.eventName" class="text-danger">{{ errors.eventName }}</div>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="hostName"
                  v-model="hostName"
                  max="255"
                  placeholder="hostName"
                  required
                />
                <label for="hostName">Hosted by</label>
                <div v-if="errors.hostName" class="text-danger">{{ errors.hostName }}</div>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="datetime-local"
                  class="form-control"
                  id="dateOfEvent"
                  v-model="dateOfEvent"
                  placeholder="dateOfEvent"
                  required
                />
                <label for="dateOfEvent">Date & Time of event</label>
                <div v-if="errors.dateOfEvent" class="text-danger">{{ errors.dateOfEvent }}</div>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  v-model="location"
                  max="255"
                  placeholder="location"
                  required
                />
                <label for="location">Location</label>
                <div v-if="errors.location" class="text-danger">{{ errors.location }}</div>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control"
                  id="maxVisitors"
                  v-model="maxVisitors"
                  min="0"
                  placeholder="maxVisitors"
                  required
                />
                <label for="maxVisitors">Max visitors, leave blank if not specified</label>
                <div v-if="errors.maxVisitors" class="text-danger">{{ errors.maxVisitors }}</div>
              </div>

              <div class="mb-3">
                <div class="d-flex justify-content-between">
                  <label for="description" class="text-start form-label">Description</label>
                  <span class="text-muted">{{ charCount }} / {{ maxCharCount }}</span>
                </div>
                <textarea
                  class="form-control"
                  id="description"
                  v-model="description"
                  placeholder="Enter description here"
                  required
                  style="height: 100px"
                ></textarea>
                <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
                <div v-if="!isFormValid" class="text-danger">
                  Description exceeds limit: {{ charCount }} > {{ maxCharCount }}
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-danger {
  text-align: left;
  margin-top: 3px;
  margin-left: 3px;
}

.alert-success {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  width: 40%;
  opacity: 0.9;
  transition: opacity 0.5s ease;
}

.btn-primary {
  background-color: #182e6f;
  border-color: #0f1c44;
  color: #f5f5dc;
}

.btn-primary:hover {
  background-color: #2549b6;
}

.btn-primary:disabled {
  background-color: #5e5e5f;
  border-color: #5f5f5f;
}

.btn-secondary {
  background-color: #5f5f5f;
  border-color: #5f5f5f;
  color: #f5f5dc;
}

.btn-secondary:hover {
  background-color: #4b4b4b;
}

.manage-page-container {
  text-align: center;
  margin-top: 1.5rem;
}

.card-row {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card-row:after {
  content: '';
  flex: auto;
}

.card-column {
  flex: calc(20% - 20px);
  margin-bottom: 10px;
  max-width: calc(20% - 20px);
}
</style>
