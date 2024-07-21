<template>
    <div class="d-flex align-items-center ListItemsBox">
      List Items Box{{icon}}{{listTitle}}{{listColor}}{{itemCount}}
    </div>
  </template>
  
  <script>
  export default {
    name: 'ListItemsBox',
    data() {
      return {
        
      };
    },
    props:{
      icon: String,
      listTitle: String,
      listColor: String,
      itemCount: String,
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  .ListItemsBox {
    display: inline;
    justify-content: space-between;

  }
  </style>