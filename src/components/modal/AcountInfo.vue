<template>
  <div
    class="modal fade acountInfo"
    id="acountInfoModal"
    tabindex="-1"
    aria-labelledby="acountInfoLabel"
    aria-hidden="true"
    ref="acountInfoModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4>AcountInfo</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="acountInfo container">
            <div>
              <div class="d-flex align-items-center line">
                <h5>이메일</h5>
                {{ id }}
              </div>
              <div class="d-flex align-items-center line">
                <h5>닉네임</h5>
                {{ nickname }}
              </div>
              <div class="d-flex align-items-center line">
                <h5>가입일</h5>
                {{ created_at }}
              </div>
              <div class="d-flex align-items-center line">
                <h5>간편로그인설정</h5>
                <btn>설정</btn>
              </div>
              <div class="d-flex align-items-center line">
                <h5>비밀번호 변경</h5>
                <btn>변경</btn>
              </div>
            </div>
            <hr />
            <div class="footer d-flex align-items-center line">
              <span><h5>회원가입</h5></span>
            <hr />
              <span><h5>로그인</h5> </span>
              <span><h5>로그아웃</h5> </span>
              <span><h5>회원탈퇴</h5></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import btn from '../button/basicbutton.vue';
import switchbuton from '../button/switchbuton.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  components: { switchbuton, btn },
  name: "AcountInfo",
  data() {
      return {
        id: "mnbxox@naver.com",
        nickname: "betty",
        created_at: "2024-06-08",
      };
    },
  props: {
    id: String,
    nickname: String,
    created_at: String,
  },
  setup() {
    const acountInfoModal = ref(null);

    const showModal = () => {
      const modal = new bootstrap.Modal(acountInfoModal.value);
      modal.show();
    };

    onMounted(() => {
      if (acountInfoModal.value) {
        acountInfoModal.value.showModal = showModal;
      }
    });

    return {
      acountInfoModal,
      showModal,
    };
  },
};
</script>
  
  <style scoped>
.AcountInfo {
  max-width: 400px;
  padding-top: 10px;
}
.fourth-container {
  margin: 20px;
}
.line {
  display: inline;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 15px;
}
</style>