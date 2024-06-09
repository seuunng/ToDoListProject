<template>
    <div class="menuBar">
      <router-link to="/" class="item">
        <i class="fa-solid fa-cat"></i>
      </router-link>
      <router-link to="/ReadTaskPage" class="item">
        <i class="fa-regular fa-square-check"></i>
      </router-link>
      <router-link to="/MonthlyBoard" class="item">
        <i class="fa-solid fa-calendar-days"></i>
      </router-link>
      <router-link to="/" class="item">
        <i class="fa-solid fa-gear"></i>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'menuBar',
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  .menuBar {
    height: 100vh;
    width: 50px;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1; 
  }
  .item {
    color: white;
    padding-top: 15px;
    padding-bottom: 15px;

  }
  </style>