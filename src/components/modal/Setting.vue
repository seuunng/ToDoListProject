<template>
  <div
    class="modal fade settingModal"
    id="settingModal"
    tabindex="-1"
    aria-labelledby="settingModalLabel"
    aria-hidden="true"
    ref="settingModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Setting</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="setting container">
            <div>
              <h4>날짜&시간 설정</h4>
              <hr />
              <div class="d-flex align-items-center line">
                <h5>시간형식</h5>
                <dropdownbtn
                  :options="dropdownOptions_time"
                  @option-selected="handleOptionSelected"
                  >선택</dropdownbtn
                >
              </div>
              <div class="d-flex align-items-center line">
                <h5>주시작날짜</h5>
                <dropdownbtn
                  :options="dropdownOptions_week"
                  @option-selected="handleOptionSelected"
                  >선택</dropdownbtn
                >
              </div>
            </div>
            <hr />
            <div>
              <div class="d-flex align-items-center line">
                <h4>알람 설정</h4>
                <switchbuton
                  v-model="allSwitches" 
                  @change="toggleAllSwitches"
                ></switchbuton>
              </div>
              <hr />

              <div class="d-flex align-items-center line">
                <h5>기본 알림기간</h5>
                <dropdownbtn
                  :options="dropdownOptions_alarmtime"
                  @option-selected="handleOptionSelected"
                  >선택</dropdownbtn
                >
              </div>
              <div class="d-flex align-items-center line">
                <h5>기본 알림방법</h5>
                <dropdownbtn
                  :options="dropdownOptions_alarmmethod"
                  @option-selected="handleOptionSelected"
                  >선택</dropdownbtn
                >
              </div>
              <div class="d-flex align-items-center line">
                <h5>기본 알림소리</h5>
                <dropdownbtn
                  :options="dropdownOptions_alarmsound"
                  @option-selected="handleOptionSelected"
                  >선택</dropdownbtn
                >
              </div>
            </div>
            <hr />
            <div>
              <div class="d-flex align-items-center line">
                <h4>스마트목록 설정</h4>
                <switchbuton
                  v-model="allSwitches"
                  @change="toggleAllSwitches"
                ></switchbuton>
              </div>
              <hr />

              <div class="d-flex align-items-center line">
                <h5>오늘할일</h5>
                <switchbuton 
                  v-model="switches.today"
                >
                </switchbuton>
              </div>
              <div class="d-flex align-items-center line">
                <h5>내일할일</h5>
                <switchbuton 
                  v-model="switches.tomorrow"
                >
                </switchbuton>
              </div>
              <div class="d-flex align-items-center line">
                <h5>다음7일할일</h5>
                <switchbuton 
                  v-model="switches.next7Days"
                >
                </switchbuton>
              </div>
              <div class="d-flex align-items-center line">
                <h5>기본함</h5>
                <switchbuton 
                  v-model="switches.defaultBox"
                >
                </switchbuton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, reactive, onMounted } from "vue";
import btn from "../button/basicbutton.vue";
import switchbuton from "../button/switchbuton.vue";
import dropdownbtn from "../button/dropdownbutton.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  components: { switchbuton, btn, dropdownbtn },
  name: "Setting",
  data() {
    return {
      allSwitches: false, // 모든 스위치의 상태를 관리하는 변수
      dropdownOptions_week: ["월요일", "일요일"],
      dropdownOptions_time: ["12시간", "24시간"],
      dropdownOptions_alarmtime: ["정각", "10분전", "30분전", "하루전"],
      dropdownOptions_alarmmethod: ["이메일", "카톡알림", "팝업"],
      dropdownOptions_alarmsound: ["벨소리", "진동", "무음"],
      switches: reactive({
        today: false,
        tomorrow: false,
        next7Days: false,
        defaultBox: false,
      }),
    };
  },
  methods: {
    toggleAllSwitches() {
      this.allSwitches = !this.allSwitches;
      this.switches.today = this.allSwitches;
      this.switches.tomorrow = this.allSwitches;
      this.switches.next7Days = this.allSwitches;
      this.switches.defaultBox = this.allSwitches;
    },
    handleOptionSelected(option) {
      alert(`Selected option: ${option}`);
    },
  },
  setup() {
    const settingModal = ref(null);

    const showModal = () => {
      const modal = new bootstrap.Modal(settingModal.value);
      modal.show();
    };

    onMounted(() => {
      console.log('onMounted - settingModal:', settingModal.value);
      if (settingModal.value) {
        settingModal.value.showModal = showModal;
      }
    });

    return {
      settingModal,
      showModal,
    };
  },
};
</script>
  
  <style scoped>
.setting {
  max-width: 400px;
  margin-top: 20px;
}
.line {
  display: inline;
  justify-content: space-between;
}
</style>