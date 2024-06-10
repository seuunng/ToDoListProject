<template>
  <div>
    <div class="menuBar">
      <div @click="showAcountInfo" class="item">
        <i class="fa-solid fa-cat"></i>
      </div>
      <router-link to="/BasicBoard" class="item">
        <i class="fa-regular fa-square-check"></i>
      </router-link>
      <router-link to="/MonthlyBoard" class="item">
        <i class="fa-solid fa-calendar-days"></i>
      </router-link>
      <router-link to="/Setting" class="item">
        <i class="fa-solid fa-gear"></i>
      </router-link>
    </div>
    <AcountInfo
      ref="acountInfo"
      :id="id"
      :nickname="nickname"
      :created_at="created_at"
    />
  </div>
</template>
  
  <script>
import { ref } from "vue";
import AcountInfo from "./modal/AcountInfo.vue";
export default {
  name: "menuBar",
  props: {
    id: String,
    nickname: String,
    created_at: String,
  },
  components: {
    AcountInfo,
  },
  setup() {
    const acountInfo = ref(null);

    const showAcountInfo = () => {
      if (acountInfo.value && acountInfo.value.showModal) {
        acountInfo.value.showModal();
      } else {
        console.error("acountInfo is not available yet");
      }
    };
    return { acountInfo, showAcountInfo };
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
}
</style>