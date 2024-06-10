<template>
    <div class="AcountInfo container">
      <div>
        <h4>AcountInfo</h4>
        <div class="d-flex align-items-center line">
          <h5>이메일</h5> {{ id }}
        </div>
        <div class="d-flex align-items-center line">
          <h5>닉네임</h5> {{ nickname }}
        </div>
        <div class="d-flex align-items-center line">
          <h5>가입일</h5> {{ created_at }}
        </div>
        <div class="d-flex align-items-center line">
          <h5>간편로그인설정</h5> <btn>설정</btn></div>
        <div class="d-flex align-items-center line"><h5>비밀번호 변경</h5> <btn>변경</btn></div>
      </div>
      <hr/>
      <div class="fourth-container d-flex align-items-center  line">
        <h5>회원가입 </h5> 
        <h5>로그인 </h5> 
        <h5>로그아웃 </h5> 
        <h5>회원탈퇴 </h5>
      </div>
    </div>
  </template>
  
  <script>
import btn from '../button/basicbutton.vue';
import switchbuton from '../button/switchbuton.vue';

  export default {
  components: { switchbuton, btn },
    name: 'AcountInfo',
    data() {
      return {
        id: 'example@example.com',
        nickname: 'User123',
        created_at: '2023-01-01',
        allSwitches: false // 모든 스위치의 상태를 관리하는 변수  
      };
    },
    methods: {
      toggleAllSwitches() {
        this.allSwitches = !this.allSwitches;
    }
    }
  };
  </script>
  
  <style scoped>
  .AcountInfo{
    max-width: 400px;
    padding-top: 10px;
  }
  .fourth-container {
    margin: 20px
  }
  .line{
    display: inline;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  </style>