<template>
    <div class="Login">
      <div class="title">
        <h4>Login</h4>
      </div>
      <div class="input">
        <input type="email" placeholder="email@email.com">
      </div>
      <div  class="input">
        <input type="password" placeholder="Password">
      </div>
      <div class="btn">
        <basicbutton>Login</basicbutton>
      </div>
    </div>
  </template>
  
  <script>
import basicbutton from '../button/basicbutton.vue';
  export default {
  components: { basicbutton },
    name: 'Login',
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  .Login {
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .input{
    margin-top: 15px;
  }
  .btn{
    margin-top: 5px;
  }
  </style>