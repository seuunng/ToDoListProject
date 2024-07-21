<template>
  <div>
    <div class="sideBar">
      <div class="content">
        <div class="listCont">
          <div class="list">
            <list-items-box :value="''" />
          </div>
        </div>
        <hr />
        <div class="listCont">
          <div class="d-flex align-items-center title" @click="showCreateList">
            <h6 class="item">Lists</h6>
            <i class="fa-solid fa-plus"></i>
          </div>
          <div class="list">
            <list-items-box :value="''" />
          </div>
        </div>
      </div>
    </div>
    <CreateList 
      ref="showCreateListModal"
      :icon="'&'"
      :list="'할일목록'"
      :count="'20'"
      :color="'red'" />
  </div>
</template>
  
<script>
import { ref } from "vue";
import CreateList from "./modal/CreateList.vue";
import ListItemsBox from "./task_state/ListItemsBox.vue";

export default {
  components: { ListItemsBox, CreateList },
  name: "sideBar",
  data() {
    return {
    };
  },
  setup() {
    const showCreateListModal = ref(null);

    const showCreateList = () => {
      console.log("showCreateList click!!");
      if (showCreateListModal.value && showCreateListModal.value.showModal) {
        showCreateListModal.value.showModal();
      } else {
        console.error("showCreateList is not available yet");
      }
    };
    return { showCreateList, showCreateListModal};
  },
};
</script>
  
<style scoped>
.sideBar {
  height: 100vh; /* Full height */
  width: 200px; /* Adjust the width as needed */
  background-color: lightgray;
  color: gray;
  position: fixed;
  top: 0;
  left: 50px; /* Adjust this value to align with the menu bar */
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  transition: transform 0.3s ease; /* Smooth transition */
  padding-top: 20px;
  z-index: 2; /* 모달보다 낮은 z-index */
}
.content {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
}
.listCont {
  margin: 5px;
}
.title {
  display: inline;
  justify-content: space-between;
}
.list {
}
</style>