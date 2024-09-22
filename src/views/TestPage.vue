<script setup lang="ts">
import EventCard from '@/components/eventCard/EventCard.vue'

const events = [
  {
    eventName: 'Vue.js Conference',
    hostName: 'John Doe',
    description: 'An amazing event about Vue.js and its ecosystem.',
    date: '2024-04-15',
    time: '18:00',
    location: 'San Francisco, CA'
  },
  {
    eventName: 'React Summit',
    hostName: 'Jane Smith',
    description: 'Join us for the biggest React conference.',
    date: '2024-06-12',
    time: '09:00',
    location: 'New York, NY'
  },
  {
    eventName: 'Angular Connect',
    hostName: 'Alex Johnson',
    description: 'Explore the latest in Angular development.',
    date: '2024-09-23',
    time: '13:00',
    location: 'London, UK'
  },
  {
    eventName: 'Svelte Summit',
    hostName: 'Maria Garcia',
    description: 'All about Svelte and its future.',
    date: '2024-11-05',
    time: '10:00',
    location: 'Berlin, Germany'
  },
  {
    eventName: 'Vue.js Conference',
    hostName: 'John Doe',
    description: 'An amazing event about Vue.js and its ecosystem.',
    date: '2024-04-15',
    time: '18:00',
    location: 'San Francisco, CA'
  },
  {
    eventName: 'React Summit',
    hostName: 'Jane Smith',
    description: 'Join us for the biggest React conference.',
    date: '2024-06-12',
    time: '09:00',
    location: 'New York, NY'
  },
  {
    eventName: 'Angular Connect',
    hostName: 'Alex Johnson',
    description: 'Explore the latest in Angular development.',
    date: '2024-09-23',
    time: '13:00',
    location: 'London, UK'
  },
  {
    eventName: 'Svelte Summit',
    hostName: 'Maria Garcia',
    description: 'All about Svelte and its future.',
    date: '2024-11-05',
    time: '10:00',
    location: 'Berlin, Germany'
  }
]
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div v-for="event in events" :key="event.eventName" class="col-md-2 mb-2">
        <EventCard :event-data="event" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>