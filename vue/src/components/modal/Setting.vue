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
                  :selectedOption="selectedOptions.time"
                  @option-selected="option => handleOptionSelected('time', option)"
                  ></dropdownbtn>
              </div>
              <div class="d-flex align-items-center line">
                <h5>주시작날짜</h5>
                <dropdownbtn
                  :options="dropdownOptions_week"
                  :selectedOption="selectedOptions.week"
                  @option-selected="option => handleOptionSelected('week', option)"
                >{{ selectedOptions.week }}</dropdownbtn>
              </div>
            </div>
            <hr />
            <div>
              <div class="d-flex align-items-center line">
                <h4>알람 설정</h4>
                <switchbuton
                  v-model="allSwitches_alram" 
                  @click="toggleAllSwitches_alram"
                ></switchbuton>
              </div>
              <hr />

              <div class="d-flex align-items-center line">
                <h5>기본 알림기간</h5>
                <dropdownbtn
                  :options="dropdownOptions_alarmtime"
                  :disabled="!allSwitches_alram"
                  :selectedOption="selectedOptions.alarmtime"
                  @option-selected="option => handleOptionSelected('alarmtime', option)"
                >{{ selectedOptions.alarmtime }}</dropdownbtn>
              </div>
              <div class="d-flex align-items-center line">
                <h5>기본 알림방법</h5>
                <dropdownbtn
                  :options="dropdownOptions_alarmmethod"
                  :disabled="!allSwitches_alram"
                  :selectedOption="selectedOptions.alarmmethod"
                  @option-selected="option => handleOptionSelected('alarmmethod', option)"
                >{{ selectedOptions.alarmmethod }}</dropdownbtn>
              </div>
              <div class="d-flex align-items-center line">
                <h5>기본 알림소리</h5>
                <dropdownbtn
                  :options="dropdownOptions_alarmsound"
                  :disabled="!allSwitches_alram"
                  :selectedOption="selectedOptions.alarmsound"
                  @option-selected="option => handleOptionSelected('alarmsound', option)"
                >{{ selectedOptions.alarmsound }}</dropdownbtn>
              </div>
            </div>
            <hr />
            <div>
              <div class="d-flex align-items-center line">
                <h4>스마트목록 설정</h4>
                <switchbuton
                  v-model="allSwitches_list" 
                  @click="toggleAllSwitches_list"
                ></switchbuton>
              </div>
              <hr />

              <div class="d-flex align-items-center line">
                <h5>오늘 할 일</h5>
                <switchbuton 
                  v-model="switches.today"
                  :checked="switches.today"
                  :disabled="!allSwitches_list"
                ></switchbuton>
              </div>
              <div class="d-flex align-items-center line">
                <h5>내일 할 일</h5>
                <switchbuton 
                  v-model="switches.tomorrow"
                  :checked="switches.tomorrow"
                  :disabled="!allSwitches_list"
                ></switchbuton>
              </div>
              <div class="d-flex align-items-center line">
                <h5>다음 7일 할 일 </h5>
                <switchbuton 
                  v-model="switches.next7Days"
                  :checked="switches.next7Days"
                  :disabled="!allSwitches_list"
                ></switchbuton>
              </div>
              <div class="d-flex align-items-center line">
                <h5>기본함</h5>
                <switchbuton 
                  v-model="switches.defaultBox"
                  :checked="switches.defaultBox"
                  :disabled="!allSwitches_list"
                ></switchbuton>
              </div>
            </div>  
          </div>
        </div>
        <div class="modal-footer">
          <div class="btn">
            <basicbutton>저장</basicbutton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, reactive, onMounted, computed } from "vue";
import btn from "../button/basicbutton.vue";
import switchbuton from "../button/switchbuton.vue";
import dropdownbtn from "../button/dropdownbutton.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  components: { switchbuton, btn, dropdownbtn },
  name: "Setting",
  setup() {
    const settingModal = ref(null);
    const allSwitches_list = ref(true);
    const allSwitches_alram = ref(true);
    const dropdownOptions_week = ["월요일", "일요일"];
    const dropdownOptions_time = ["12시간", "24시간"];
    const dropdownOptions_alarmtime = ["정각", "10분전", "30분전", "하루전"];
    const dropdownOptions_alarmmethod = ["이메일", "카톡알림", "팝업"];
    const dropdownOptions_alarmsound = ["벨소리", "진동", "무음"];

    const selectedOptions = reactive({
      week: "선택",
      time: "선택",
      alarmtime: "선택",
      alarmmethod: "선택",
      alarmsound: "선택",
    });

    const switches = reactive({
      today: false,
      tomorrow: false,
      next7Days: false,
      defaultBox: false,
    });

    // const disabledSwitches = ref(false);

    const handleOptionSelected = (type, option) => {
      selectedOptions[type] = option;
    };

    const toggleAllSwitches_list = () => {
      const newState = !allSwitches_list.value;
      allSwitches_list.value = newState;
      switches.today = newState;
      switches.tomorrow = newState;
      switches.next7Days = newState;
      switches.defaultBox = newState;
    };
    const toggleAllSwitches_alram = () => {
      const newState = !allSwitches_alram.value;
      allSwitches_alram.value = newState;
    };

    const showModal = () => {
      const modal = new bootstrap.Modal(settingModal.value);
      modal.show();
    };

    onMounted(() => {
      if (settingModal.value) {
        settingModal.value.showModal = showModal;
      }
    });

    return {
      settingModal,
      allSwitches_list,
      allSwitches_alram,
      dropdownOptions_week,
      dropdownOptions_time,
      dropdownOptions_alarmtime,
      dropdownOptions_alarmmethod,
      dropdownOptions_alarmsound,
      selectedOptions,
      switches,
      handleOptionSelected,
      toggleAllSwitches_list,
      toggleAllSwitches_alram,
      showModal,
      // disabledSwitches
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