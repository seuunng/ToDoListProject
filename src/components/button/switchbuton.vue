<template>
    <div class="form-check form-switch form-check-reverse">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse">
    </div>
  </template>
  
  <script>
  export default {
    name: 'switch-button',
    props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('change', event.target.checked);
    }
  }
  };
  </script>
  
  <style scoped>
  .switch-button {
    margin: 20px;
  }
  </style>