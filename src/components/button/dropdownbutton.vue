<template>
  <div class="dropdownbutton">
    <div class="btn-group">
      <button type="button" class="btn btn-primary btn-sm"><slot></slot></button>
      <button type="button" class="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden"></span>
      </button>
      <ul class="dropdown-menu">
        <li v-for="(option, index) in options" :key="index">
          <a class="dropdown-item" href="#" @click="handleOptionClick(option)">{{ option }}</a>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'dropdownbutton',
    props: {
      options: {
        type: Array,
        required: true
      }
  },
  methods: {
    handleOptionClick(option) {
      this.$emit('option-selected', option);
    }
  }
  };
  </script>
  
  <style scoped>
  .dropdownbutton {
  }
  </style>