<template>  
  <div id="app"  @click="hideSidebar">
    <menuBar></menuBar>
    <RouterView></RouterView>
    <div class="icon" @click.stop="toggleSidebar">
      <i class="fa-solid fa-bars" style="color: #6e6e6e;" alt="Toggle Sidebar"></i>
    </div>
    <side-bar v-if="isSidebarVisible" @click.stop />
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
    hideSidebar() {
      this.isSidebarVisible = false;
    }
  }
  });
  </script>
  
  <style>
  .icon {
    position: fixed;
    top: 10px;
    left: 60px;
    cursor: pointer;
    z-index: 3;
  }
  #app {
    padding-top: 4px; 
    padding-left: 45px; /* Adjusted to avoid overlapping with the menu bar */
  }
  </style>