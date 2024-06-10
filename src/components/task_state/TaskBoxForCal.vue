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
    name: 'TaskBoxForCal',
    data() {
      return {
        task: "코딩하기",
      };
    },
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