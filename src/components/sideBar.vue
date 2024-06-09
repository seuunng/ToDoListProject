<template>
    <div class="sideBar">
        <h4 class="item">스마트목록리스트</h4>
        <list-items-box></list-items-box>
        <h4 class="item">할일목록리스트</h4>
        <list-items-box></list-items-box>
    </div>
  </template>
  
  <script>
import ListItemsBox from './task_state/ListItemsBox.vue';
  export default {
  components: { ListItemsBox },
    name: 'sideBar',
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  .sideBar {
    height: 100vh; /* Full height */
    width: 200px; /* Adjust the width as needed */
    background-color: lightgray;
    color: gray;
    position: fixed;
    top: 0;
    left: 50px; /* Adjust this value to align with the menu bar */
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    transition: transform 0.3s ease; /* Smooth transition */
    padding-top: 20px;
  }
  .item {
    padding-left: 10px;
  }
  </style>