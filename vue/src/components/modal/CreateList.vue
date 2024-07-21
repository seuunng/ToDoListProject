<template>
  <div
    class="modal fade showCreateListModal"
    id="showCreateListModal"
    tabindex="-1"
    aria-labelledby="showCreateListModalLabel"
    aria-hidden="true"
    ref="showCreateListModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center line title">
            <h4>Add List</h4>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <EmojiPicker />
          <div class="d-flex align-items-center choseColor item">
            <div class="colorTitle box">Color&emsp;</div>
            <div class="colorItem box">
              <i class="fa-solid fa-circle"></i>&emsp;
              <i class="fa-solid fa-circle"></i>&emsp;
              <i class="fa-solid fa-circle"></i>&emsp;
            </div>
          </div>
          <div class="d-flex align-items-center isSmartList item">
            <div class="checkbox box">
              <input type="checkbox" />
              스마트 목록에서 안보이게하고 싶어요
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
          <button type="button" class="btn btn-primary">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import EmojiPicker from "../button/EmojiPicker.vue";
export default {
  components: { EmojiPicker },
  name: "CreateList",
  data() {
    return {};
  },
  methods: {},
  props:{
    icon: String,
    list: String,
    count: String,
    color: String,
  },
  setup() {
    const showCreateListModal = ref(null);

    const showModal = () => {
      const modal = new bootstrap.Modal(showCreateListModal.value);
      modal.show();
    };
    onMounted(() => {
      if (showCreateListModal.value) {
        showCreateListModal.value.showModal = showModal;
      }
    });
    return {
      showCreateListModal,
      showModal,
    };
  },
};
</script>
  
  <style scoped>
/* 기본 백드롭 스타일 */
.custom-input {
  width: 100%;
  border: none; /* 테두리 없애기 */
  background-color: #f0f0f0; /* 배경색 추가 */
  padding: 8px; /* 여백 추가 */
  border-radius: 4px; /* 둥근 모서리 */
  font-size: 14px; /* 글꼴 크기 */
  box-sizing: border-box;
}
.item {
  margin: 10px;
}
.box {
  margin: 5px;
}
</style>