<template>
    <div class="modal fade ReadTaskModal" id="readTaskModal" tabindex="-1" aria-labelledby="readTaskModalLabel" aria-hidden="true" ref="readTaskModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex align-items-center line">
                <completed-task-check-box></completed-task-check-box>
                <span class="date-icon"><i class="fa-regular fa-calendar"></i> </span>
                <span class="date"> {{ date }} </span>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center line">
              <span class="task-title"><h4 class="">{{tasktitle}}</h4></span>
              <span class="flag-icon"><i class="fa-regular fa-flag"></i></span>
            </div>
              <div class="description">{{ description }}</div>
          </div>
          <hr/>
            <div  class="d-flex align-items-center line">
              <span class="list-title">{{ listtiile }}</span>
              <span class="setting-icon"><i class="fa-solid fa-ellipsis"> </i></span> 
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref, onMounted } from "vue";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import CompletedTaskCheckBox from '../task_state/CompletedTaskCheckBox.vue';

export default {
  components: { CompletedTaskCheckBox },
  name: "ReadTaskModal",
  data() {
    return {
      listtiile: "2024년 해야할 일"
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
}
.checkbox {
  margin-right: 10px; /* 체크박스와 날짜 아이콘 사이에 공백 추가 */
}

.date-icon {
  margin-right: 10px; /* 날짜 아이콘과 날짜 사이에 공백 추가 */
}
.setting-icon {
  margin-right: 15px; /* 날짜 아이콘과 날짜 사이에 공백 추가 */
  margin-bottom: 15px;
}
.list-title {
  margin-left: 15px; /* 날짜 아이콘과 날짜 사이에 공백 추가 */
  margin-bottom: 15px;
}
.line {
  display: inline;
  justify-content: space-between;
}
.description {
  height: 200px;
}

</style>