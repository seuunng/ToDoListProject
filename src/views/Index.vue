<template>  
  <div id="app">
    <menuBar></menuBar>
    <RouterView></RouterView>
    <div class="icon" @click="toggleSidebar">
      <i class="fa-solid fa-bars" style="color: #6e6e6e;" alt="Toggle Sidebar"></i>
    </div>
    <side-bar v-if="isSidebarVisible" />
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import sideBar from '../components/sideBar.vue'
  import menuBar from '../components/menuBar.vue';
 
  
  export default defineComponent ({
    name: 'index',
    components: {
      sideBar,
      menuBar
    },
  data() {
    return {
      isSidebarVisible: false
    };
  },
  methods: { 
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
  }
  });
  </script>
  
  <style>

  .icon {
    position: fixed;
    top: 10px;
    left: 60px;
    cursor: pointer;
    z-index: 2;
  }
  #app {
    padding-left: 60px; /* Adjusted to avoid overlapping with the menu bar */
  }
  </style>