<template>
  <div>
    <div class="TaskBox" @click="readMemo">
      <div class="left-section">
        <completed-task-check-box></completed-task-check-box>
        <span class="task">{{ task }}</span>
      </div>
      <div class="right-section">
        <span class="repeat"><i class="fa-solid fa-repeat"></i></span>
        <span class="alarm"><i class="fa-solid fa-bell"></i></span>
        <span class="date">{{ date }} </span> 
        <span class="setting"><i class="fa-solid fa-ellipsis"> </i></span> 
      </div>
    </div>
    <ReadTaskModal
      ref="readTaskModal"
      :date="date"
      :tasktitle="task"
      :description="description"
      :listtitle="listtitle"
    />
  </div>
</template>
  
  <script>
import { ref } from 'vue';
import CompletedTaskCheckBox from './CompletedTaskCheckBox.vue';
import ReadTaskModal from '../modal/ReadTaskModal.vue';

  export default {
  components: { CompletedTaskCheckBox, ReadTaskModal,},
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
  setup() {
    const readTaskModal = ref(null);
    const isModalVisible = ref(false);
    
    const readMemo = () => {
      if (readTaskModal.value && readTaskModal.value.showModal) {
        readTaskModal.value.showModal();
      } else {
        console.error('readTaskModal is not available yet');
      }
    };
    return { readTaskModal, readMemo };
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
    flex-grow: 1; /* 할 일이 가능한 공간을 차지하도록 설정 */
    min-width: 50px; /* 최소 너비 설정 */
    max-width: 100%; /* 최대 너비 설정 */
    overflow: hidden;
    text-overflow: ellipsis; /* 넘치는 텍스트에 줄임표(...) 표시 */
    white-space: hidden; /* 텍스트 줄 바꿈 방지 */
  }
  .right-section {
    display: flex;
    align-items: center; /* 수직 정렬 */
  }
  
  .right-section > span {
    margin-left: 8px; /*옵션 사이에 간격 추가 */
  }
  </style>
  