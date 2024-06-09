<template>
  <div class="TaskBox">
    <div class="left-section">
      <completed-task-check-box></completed-task-check-box>
      <span class="task">{{ task }}</span>
    </div>
    <div class="right-section">
      <span class="repeat">{{ repeat }}</span>
      <span class="alarm">{{ alarm }}</span>
      <span class="date">{{ date }}</span>
    </div>
  </div>
</template>
  
  <script>
import CompletedTaskCheckBox from './CompletedTaskCheckBox.vue';
  export default {
  components: { CompletedTaskCheckBox },
    name: 'TaskBox',
    props: {
      task: {
        type: String,
        required: true
      },
      repeat: String,
      alarm: String,
      date: {
        type: String,
        required: true
      },
    },
  };
  </script>
  
  <style scoped>
  .TaskBox {
    display: flex;
    justify-content: space-between; /* 좌우로 정렬 */
    align-items: center; /* 수직 정렬 */
    margin-top: 5px;
  }
  .left-section {
    display: flex;
    align-items: center;
    flex-grow: 1; 
  }
  .task {
    margin-left: 8px; /* 체크박스와 텍스트 사이에 간격 추가 */
    flex-grow: 1; /* 할 일이 가능한 공간을 차지하도록 설정 */
    min-width: 50px; /* 최소 너비 설정 */
    max-width: 100%; /* 최대 너비 설정 */
    overflow: hidden;
    text-overflow: ellipsis; /* 넘치는 텍스트에 줄임표(...) 표시 */
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  }
  .right-section {
    display: flex;
    align-items: center; /* 수직 정렬 */
    
  }
  
  .right-section > span {
    margin-left: 8px; /* 옵션 사이에 간격 추가 */
  }
  </style>