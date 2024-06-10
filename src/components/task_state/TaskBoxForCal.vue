<template>
    <div class="TaskBoxForCal">
      <div class="color-box" @click="readMemo">
        <span class="repeat"><i class="fa-solid fa-repeat"></i></span>
        <span class="task">{{ task }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';

  export default {
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
    const router = useRouter();
    
    const readMemo = () => {
      router.push({ name: 'ReadTaskModal' });
    };
    return { readMemo };
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