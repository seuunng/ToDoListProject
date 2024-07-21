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
          <div v-if="!isEditing"><h4>AcountInfo</h4></div>
          <div v-else><h4>Login</h4></div>
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
                <div v-if="!isEditing">{{ id }}</div>
                <div v-else><input v-model="editableId" /></div>
              </div>
              <div class="d-flex align-items-center line">
                <h5>닉네임</h5>
                <div v-if="!isEditing">{{ nickname }}</div>
                <div v-else><input v-model="editableNickname" /></div>
              </div>
              <div class="d-flex align-items-center line">
                <h5>가입일</h5>
                <div v-if="!isEditing">{{ created_at }}</div>
                <div v-else><input v-model="editableCreatedAt" /></div>
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
              <span v-if="!isLoggedIn && isGuest"><h5>{{ '회원가입' }}</h5></span>
              <span v-if="!isLoggedIn && isGuest"><h5>게스트 로그인</h5></span>

              <span v-if="!isLoggedIn && !isGuest"><h5 @click="toggleEdit">{{ isEditing ? '로그인' : '로그인' }}</h5></span>
              <span v-if="!isLoggedIn && !isGuest"><h5 @click="toggleEdit">{{ isEditing ? '로그인' : '간편로그인' }}</h5></span>

              <span v-if="isLoggedIn"><h5>로그아웃</h5></span>
              <span v-if="isLoggedIn"><h5>회원탈퇴</h5></span>
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
 
  props: {
    id: String,
    nickname: String,
    created_at: String,
  },
  setup(props) {
    const acountInfoModal = ref(null);
    const isEditing = ref(false);
    const editableId = ref(props.id);
    const editableNickname = ref(props.nickname);
    const editableCreatedAt = ref(props.created_at);
    // Additional states for account status
    const isLoggedIn = ref(false); // This should be set based on actual account status
    const isGuest = ref(false); // This should be set based on actual account status

    const showModal = () => {
      const modal = new bootstrap.Modal(acountInfoModal.value);
      modal.show();
    };
    const toggleEdit = () => {
      if (isEditing.value) {
        // Save the changes if switching from edit to view mode
        // Here you might want to emit events or handle API calls to save changes
      }
      isEditing.value = !isEditing.value;
    };
    onMounted(() => {
      if (acountInfoModal.value) {
        acountInfoModal.value.showModal = showModal;
      }
    });

    return {
      acountInfoModal,
      showModal,
      isEditing,
      editableId,
      editableNickname,
      editableCreatedAt,
      toggleEdit,
      isLoggedIn,
      isGuest,
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