<template>
    <div class="simple-input-task">
      <div class="input-container">
        <input type="text" class="custom-input" placeholder="할일을 추가하세요!" v-model="newTask"/>
        <i class="fa-solid fa-plus input-icon" @click="createTask"></i>
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
  }
  .input-container {
    position: relative;
    width: 90%;
    overflow: hidden;
  }
  .custom-input {
    width: 100%;
    border: none; /* 테두리 없애기 */
    background-color: #f0f0f0; /* 배경색 추가 */
    padding: 8px; /* 여백 추가 */
    border-radius: 4px; /* 둥근 모서리 */
    font-size: 14px; /* 글꼴 크기 */
  }
  
  .custom-input:focus {
    outline: none; /* 포커스 시 기본 테두리 없애기 */
  }
  .input-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #888; /* 아이콘 색상 */
  }
  </style>