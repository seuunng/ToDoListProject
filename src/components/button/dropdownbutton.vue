<template>
  <!-- <div class="dropdownbutton">
    <div >
      <button type="button" class="btn btn-sm"><slot></slot></button>
      <button type="button" class="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden"></span>
      </button>
      <ul class="dropdown-menu">
        <li v-for="(option, index) in options" :key="index">
          <a class="dropdown-item" href="#" @click="handleOptionClick(option)">{{ option }}</a>
        </li>
      </ul>
    </div>
  </div> -->
  <div class="dropdownbutton">
    <b-dropdown id="dropdown-dropright" dropright :text="selectedOption" variant="outline" class="m-2" size="sm">
      <b-dropdown-item
        v-for="(option, index) in options"
        :key="index"
        @click="handleOptionClick(option)"
      >
        {{ option }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
  </template>
  
  <script>
  export default {
    name: 'dropdownbutton',
    props: {
      options: {
        type: Array,
        required: true
      },
      selectedOption: {
      type: String,
      default: "선택"
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