<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg" style="background-color: #182e6f">
      <div class="container-fluid">
        <div class="navbar-nav d-flex flex-row">
          <router-link class="nav-link mx-2 text-decoration-none" to="/">Home</router-link>
          <router-link class="nav-link mx-2 text-decoration-none" to="/manage">Manage</router-link>
          <!-- TODO: Delete later -->
          <router-link class="nav-link mx-2 text-decoration-none" to="/test">Test</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.nav-link {
  color: #f5f5dc;
}

.nav-link:hover {
  color: #cbcbcb;
}

.nav-link:active .nav-link:focus {
  text-decoration: none;
}
</style>
