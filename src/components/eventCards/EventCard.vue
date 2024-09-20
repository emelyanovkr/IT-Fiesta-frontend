<script setup lang="ts">
import { defineProps } from 'vue'

export interface EventCardProps {
  eventName: string
  hostName: string
  description: string
  date: string
  time: string
  location: string
}

defineProps<{
  eventData: EventCardProps
}>()
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

const formatTime = (time: string) => {
  return time.slice(0, 5)
}
</script>

<template>
  <div class="card event-card">
    <div class="card-header">
      <h5 class="event-title">{{ eventData.eventName }}</h5>
      <small class="text-muted">Hosted by {{ eventData.hostName }}</small>
    </div>

    <div class="card-body">
      <p class="event-description">{{ eventData.description }}</p>
    </div>

    <div class="card-footer d-flex justify-content-between">
      <span class="event-date-time"
        >{{ formatDate(eventData.date) }} - {{ formatTime(eventData.time) }}</span
      >
      <span class="event-location">{{ eventData.location }}</span>
    </div>
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

hr {
  margin: 0.75rem 0;
}
</style>
