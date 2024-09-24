<script setup lang="ts">
import * as bootstrap from 'bootstrap'
import EventInfoModal from '@/components/eventCard/EventInfoModal.vue'

export interface EventCardProps {
  id: number
  eventName: string
  hostName: string
  date: string
  time: string
  location: string
  maxVisitors: number
  description: string
}

defineProps<{
  eventData: EventCardProps
  fetchEvents: () => void
  showAlert: (message: string) => void
}>()

const descriptionPreviewLimit = 100

const truncateDescription = (description: string, limit: number) => {
  return description.length > limit ? description.slice(0, limit) + '...' : description
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

const formatTime = (time: string) => {
  return time.slice(0, 5)
}

const showModal = (modalId: string) => {
  const modalElement = document.getElementById(modalId) as HTMLElement
  if (modalElement) {
    const infoModal = new bootstrap.Modal(modalElement)
    infoModal.show()
  } else {
    console.error('Modal element not found:', modalId)
  }
}
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
  />

  <div class="card event-card">
    <div class="card-header">
      <h5 class="event-title">{{ eventData.eventName }}</h5>
      <small class="text-muted">Hosted by {{ eventData.hostName }}</small>
    </div>

    <div class="card-body">
      <p class="event-description">
        {{ truncateDescription(eventData.description, descriptionPreviewLimit) }}
      </p>
    </div>

    <div class="card-footer position-relative" style="height: 55px; padding: 5px 10px">
      <span class="event-date-time position-absolute bottom-0 start-0" style="padding-bottom: 5px; padding-left: 5px;">
        <i class="bi bi-clock card-icons" /> {{ formatDate(eventData.date) }} -
        {{ formatTime(eventData.time) }}
      </span>
      <span
        class="event-location position-absolute bottom-0 end-0 me-2"
        style="padding-bottom: 5px"
      >
        <i class="bi bi-geo-alt card-icons" /> {{ eventData.location }}
      </span>
      <span
        class="event-max-visitors position-absolute top-0 start-0 d-flex align-items-center"
        style="padding-left: 5px; padding-top: 5px;"
      >
        <i class="bi bi-person card-icons me-1" /> {{ eventData.maxVisitors }}
      </span>
    </div>

    <a
      href="#"
      class="stretched-link"
      @click.prevent="showModal('eventInfoModal-' + eventData.id)"
    />

    <EventInfoModal
      :event-data="eventData"
      :modal-id="'eventInfoModal-' + eventData.id"
      :fetch-events="fetchEvents"
      :show-alert="showAlert"
    />
  </div>
</template>

<style scoped>
.event-card {
  margin-bottom: 1.5rem;
  border-radius: 10px;
  border: 1px solid #182e6e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event-title {
  margin: 0;
  font-weight: 600;
}

.event-description {
  margin: 0;
}

.card-footer {
  font-size: 0.85rem;
  color: #555;
}

.card-icons {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  margin-left: 0;
}
</style>
