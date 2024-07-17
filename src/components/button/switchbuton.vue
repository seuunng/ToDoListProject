<template>
  <div class="switch-button">
    <b-form-checkbox 
      v-model="isChecked" 
      name="check-button" 
      :disabled="disabled"
      switch
      @change="handleChange"
      >
      {{ label }}
    </b-form-checkbox>
  </div>
</template>
  
  <script>
  export default {
    name: 'switch-button',
    props: {
    checked: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isChecked: this.checked
    }
  },
  watch: {
    checked(newVal) {
      this.isChecked = newVal;
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.isChecked);
    }
  }
  };
  </script>
  
  <style scoped>
  .switch-button {
    margin: 5px;
  }
  </style>