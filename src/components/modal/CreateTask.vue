<template>
  <div
    class="modal fade CreateTask"
    id="createTaskModal"
    tabindex="-1"
    aria-labelledby="CreateTaskModalLabel"
    aria-hidden="true"
    ref="createTaskModal"  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center line">
            <completed-task-check-box></completed-task-check-box>
            <span class="date-icon"><i class="fa-regular fa-calendar"></i> </span>
            <span class="date"> {{ date }} </span>
        </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center line">
            <span class="task-title">
              <input type="text" name="" id="" placeholder="할일을 입력하세요">
            </span>
            <span class="flag-icon">
              <i class="fa-regular fa-flag"></i>
            </span>
          </div>
          <div class="description">
            <input type="textarea" name="" id="" placeholder="description">
          </div>
          <hr />
          <div class="d-flex align-items-center line">
            <span class="list-title"></span>
            <span class="setting-icon">
              <i class="fa-solid fa-ellipsis"></i>
            </span>
          </div>
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
  name: "CreateTask",
  props: {
    //달력으로 부터 받아온 날짜
    date: {
      type: String,
      required: true,
    }
    
  },
  setup(props) {
    const createTaskModal = ref(null);

    const showModal = () => {
      const modal = new bootstrap.Modal(createTaskModal.value);
      modal.show();
    };

    onMounted(() => {
      if (createTaskModal.value) {
        createTaskModal.value.showModal = showModal;
      }
    });

    return {
      createTaskModal,
      showModal,
    };
  },
};
</script>
  
  <style scoped>
.CreateTask {
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