<template>
    <div class="ReadTaskModal">
      <div class="d-flex align-items-center line">
        <div>
          <span class="checkbox"><input type="checkbox"> </span>
          <span class="date-icon"><i class="fa-regular fa-calendar"></i> </span>
          <span class="date"> {{ date }} </span>
        </div>
        <span class="flag-icon"><i class="fa-regular fa-flag"></i></span>
      </div>
      <span class="task-title"><h4 class="">{{tasktitle}}</h4></span>
      <div class="description">{{ description }}</div>
      <div  class="d-flex align-items-center line">
        <span class="list-title">{{ listtiile }}</span>
        <span class="setting-icon"><i class="fa-solid fa-ellipsis"> </i></span> 
      </div>
    </div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';
  export default {
    name: 'ReadTaskModal',
    data() {
      return {
        date: "24/03/24 월",
        tasktitle: "커밋하기",
        description: "description",
        listtiile: "할일목록",


      };
    },
    props: {
    date: String,
    tasktitle: String,
    description: String,
    listtitle: String,
    },
    setup() {
      const readTaskModal = ref(null);

      const showModal = () => {
        const modal = new bootstrap.Modal(readTaskModal.value);
        modal.show();
      };

      onMounted(() => {
        if (readTaskModal.value) {
          readTaskModal.value.showModal = showModal;
        }
      });

      return {
        readTaskModal,
        showModal,
      };
    },
  };
  </script>
  
  <style scoped>
  .ReadTaskModal {
    max-width: 400px;
    padding-top: 10px;

  }
  .checkbox {
    margin-right: 10px; /* 체크박스와 날짜 아이콘 사이에 공백 추가 */
  }
  
  .date-icon {
    margin-right: 10px; /* 날짜 아이콘과 날짜 사이에 공백 추가 */
  }
  .line{
    display: inline;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .description{
    height: 200px;
  }
  </style>