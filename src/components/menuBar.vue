<template>
  <div>
    <div class="menuBar">
      <div class="item" @click="showAcountInfo" >
        <i class="fa-solid fa-cat"></i>
      </div>
      <router-link to="/BasicBoard" class="item">
        <i class="fa-regular fa-square-check"></i>
      </router-link>
      <router-link to="/MonthlyBoard" class="item">
        <i class="fa-solid fa-calendar-days"></i>
      </router-link>
      <div class="item" @click="showSettingModal" >
        <i class="fa-solid fa-gear"></i>
      </div>
    </div>
    <AcountInfo
      ref="acountInfoModal"
      :id="id"
      :nickname="nickname"
      :created_at="created_at"
    />
    <Setting
      ref="settingModal"
    />
  </div>
</template>
  
  <script>
    import { ref } from 'vue';
    import AcountInfo from './modal/AcountInfo.vue';
    import Setting from './modal/Setting.vue';

    export default {
      components: { AcountInfo, Setting },
      name: "menuBar",
      props: {
        id: {
          type: String,
          required: true,
        },
        nickname: String,
        created_at: String,
      },
      setup() {
        const acountInfoModal = ref(null);
        const settingModal = ref(null);

      
        const showAcountInfo = () => {
          console.log("showAcountInfo click!!")
          console.log("acountInfoModal.value :", acountInfoModal.value)
          console.log("acountInfoModal.value.showModal:", acountInfoModal.value ? acountInfoModal.value.showModal : null)
          if (acountInfoModal.value && acountInfoModal.value.showModal) {
            acountInfoModal.value.showModal();
          } else {
            console.error("acountInfoModal is not available yet");
          }
        };
        const showSettingModal = () => {
          console.log("showSettingModal click!!")
          console.log("settingModal.value :", settingModal.value)
          console.log("settingModal.value.showModal:", settingModal.value ? settingModal.value.showModal : null)
          if (settingModal.value && settingModal.value.showModal) {
            settingModal.value.showModal();
          } else {
            console.error("settingModal is not available yet");
          }
        };
        return { acountInfoModal, settingModal, showAcountInfo, showSettingModal };
      },
    };
</script>
  
<style scoped>
.menuBar {
  height: 100vh;
  width: 50px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.item {
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
}
</style>