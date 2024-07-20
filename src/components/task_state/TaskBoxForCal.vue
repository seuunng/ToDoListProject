<template>
  <div>
    <div class="TaskBoxForCal">
      <div class="color-box" @click="readMemo">
        <span class="repeat"><i class="fa-solid fa-repeat"></i></span>
        <span class="task">{{ task }}</span>
      </div>
    </div>
    <ReadTaskModal
      ref="readTaskModal"
      :read_date="read_date"
      :read_tasktitle="read_task"
      :read_description="read_description"
      :read_listtitle="read_listtitle"
    />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import CompletedTaskCheckBox from './CompletedTaskCheckBox.vue';
  import ReadTaskModal from '../modal/ReadTaskModal.vue';
  
  export default {
    components: { CompletedTaskCheckBox, ReadTaskModal,},
    name: 'TaskBoxForCal',
    data() {
      return {
        //ReadTaskModal로 넘기는 데이터
        read_date: '2024-06-14',
        read_task: 'Buy groceries',
        read_description: 'description',
        read_listtitle: '할일목록',
      };
    },
    props: {
    //달력에서 받은 데이터
    showdate: String,
    tasktitle: String,
    description: String,
    listtitle: String,
    task: String,
  },
  setup() {
    const readTaskModal = ref(null);
   
    const readMemo = (event) => {
      event.stopPropagation();
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
  .TaskBoxForCal {
    background-color: yellow;
    width: 100%; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .color-box{
    position: relative;
    width: 100%;
    border-radius: 4px; /* 둥근 모서리 */
    font-size: 14px; 
  }
  </style>