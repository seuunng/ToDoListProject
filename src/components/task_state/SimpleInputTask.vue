<template>
    <div class="simple-input-task">
      <div class="input-container">
        <input type="text" 
          class="custom-input" 
          :placeholder="`${listTitle}에 할일을 추가하세요!`"
          v-model="newTask"
          @keyup.enter="createTask"/>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SimpleInputTask',
    data() {
      return {
        newTask: ''
      };
    },
    methods: {
      createTask(){
        if (this.newTask.trim()) {
        this.$emit('task-created', this.newTask);
        this.newTask = ''; // 입력란 초기화
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .simple-input-task {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box; /* 테두리와 패딩을 포함한 너비 계산 */
  }
  .input-container {
    position: relative;
    width: 100%;
  }
  .custom-input {
    width: 100%;
    border: none; /* 테두리 없애기 */
    background-color: #f0f0f0; /* 배경색 추가 */
    padding: 8px; /* 여백 추가 */
    border-radius: 4px; /* 둥근 모서리 */
    font-size: 14px; /* 글꼴 크기 */
    box-sizing: border-box;
  }
  
  .custom-input:focus {
    border: 1px; 
    background-color: white;
  }
 
  </style>