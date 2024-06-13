<template>
    <div class="CreateList">
      <div class="title">
        <h4>Add List</h4>
      </div>
<!-- <EmojiPicker /> -->
      <div class="container mt-5 item">
        <div class="mb-3">
          <label for="emojiInput" class="form-label"></label>
          <div class="input-group">
            <button class="btn btn-outline-secondary" type="button" id="emojiButton"><i class="fa-solid fa-bars"></i></button>
            <input class="form-control" type="text" id="emojiInput" placeholder="Name">
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center choseColor item">
        <div class="colorTitle box">
          Color&emsp;
        </div>
        <div class="colorItem box">
          <i class="fa-solid fa-circle"></i>&emsp;
          <i class="fa-solid fa-circle"></i>&emsp;
          <i class="fa-solid fa-circle"></i>&emsp;
        </div>
      </div> 
      <div class=" d-flex align-items-center isSmartList item">
        <div class="checkbox box">
          <input type="checkbox"> 
          스마트 목록에서 안보이게하고 싶어요
        </div>
      </div>
    </div>
  </template>
  
  <script>
import EmojiPicker from '../button/EmojiPicker.vue';
  export default {
  components: { EmojiPicker },
    name: 'CreateList',
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  .CreateList {

  }
  .custom-input {
    width: 100%;
    border: none; /* 테두리 없애기 */
    background-color: #f0f0f0; /* 배경색 추가 */
    padding: 8px; /* 여백 추가 */
    border-radius: 4px; /* 둥근 모서리 */
    font-size: 14px; /* 글꼴 크기 */
    box-sizing: border-box;
  }
  .item{
    margin: 10px;
  }
  .box{
    margin: 5px;
  }

  </style>