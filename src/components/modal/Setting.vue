<template>
    <div class="setting container">
      <div>  
        <h4>날짜&시간 설정</h4>
        <div class="d-flex align-items-center line">
          <h5>시간형식</h5>
          <dropdownbtn  :options="dropdownOptions_time" @option-selected="handleOptionSelected">선택</dropdownbtn>
        </div>
        <div class="d-flex align-items-center line">
        <h5 >주시작날짜</h5>
        <dropdownbtn  :options="dropdownOptions_week" @option-selected="handleOptionSelected">선택</dropdownbtn>
        </div>
      </div>
        <hr/>
      <div>
        <h4>알람 설정</h4>
        
        <div class="d-flex align-items-center line">
          <h5>자동 알림사용 선택버튼</h5><switchbuton></switchbuton>
        </div>
        <div class="d-flex align-items-center line">
        <h5>기본 알림기간</h5>
        <dropdownbtn  :options="dropdownOptions_alarmtime" @option-selected="handleOptionSelected">선택</dropdownbtn>
        </div>
        <div class="d-flex align-items-center line">
        <h5>기본 알림방법</h5>
        <dropdownbtn  :options="dropdownOptions_alarmmethod" @option-selected="handleOptionSelected">선택</dropdownbtn>
        </div>
        <div class="d-flex align-items-center line">
        <h5>기본 알림소리</h5>
        <dropdownbtn  :options="dropdownOptions_alarmsound" @option-selected="handleOptionSelected">선택</dropdownbtn>
        </div>
      </div>  
      <hr/>
      <div>  
        <h4>스마트폰 목록 설정</h4>
        <div class="d-flex align-items-center line">
          <h5>모두보이기/숨기기</h5>
          <switchbuton :checked="allSwitches" @change="toggleAllSwitches"></switchbuton>
        </div>
        <div class="d-flex align-items-center line">
          <h5>오늘</h5>
          <switchbuton :checked="allSwitches"></switchbuton>
        </div>
        <div class="d-flex align-items-center line">
          <h5>내일</h5>
          <switchbuton :checked="allSwitches"></switchbuton>
        </div>
        <div class="d-flex align-items-center line">
          <h5>다음7일</h5>
          <switchbuton :checked="allSwitches"></switchbuton>
        </div>
        <div class="d-flex align-items-center line">
          <h5>기본함</h5>
          <switchbuton :checked="allSwitches"></switchbuton>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import btn from '../button/basicbutton.vue';
import switchbuton from '../button/switchbuton.vue';
import dropdownbtn from '../button/dropdownbutton.vue';

  export default {
  components: { switchbuton, btn, dropdownbtn },
    name: 'Setting',
    data() {
      return {
        allSwitches: false, // 모든 스위치의 상태를 관리하는 변수  
        dropdownOptions_week: ['월요일', '일요일'],
        dropdownOptions_time: ['12시간', '24시간'],
        dropdownOptions_alarmtime: ['정각', '10분전', '30분전', '하루전'],
        dropdownOptions_alarmmethod: ['이메일', '카톡알림', '팝업'],
        dropdownOptions_alarmsound: ['벨소리', '진동', '무음'],
      };
    },
    methods: {
        toggleAllSwitches() {
            this.allSwitches = !this.allSwitches;
            
        },
        handleOptionSelected(option) {
        alert(`Selected option: ${option}`);
        }
    }
  };
  </script>
  
  <style scoped>
  .setting{
    max-width: 400px;
    margin-top: 20px;
  }
  .line{
    display: inline;
    justify-content: space-between;
    ;
  }
  </style>