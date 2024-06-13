<template>
    <div class="mb-3">
        <div class="input-group">
            <button class="btn btn-outline-secondary" type="button" @click="toggleEmojiPicker"><i class="fa-solid fa-bars"></i></button>
            <input class="form-control" type="text" id="emojiInput" v-model="emojiText" placeholder="Name">
        </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import EmojiButton from '@joeattardi/emoji-button';
  
  export default {
    name: 'EmojiPicker',
    setup() {
      const emojiText = ref('');
      let picker;
  
      onMounted(() => {
        picker = new window.EmojiButton();
  
        picker.on('emoji', emoji => {
          emojiText.value += emoji;
        });
      });
  
      const toggleEmojiPicker = (event) => {
        picker.togglePicker(event.currentTarget);
      };
  
      return {
        emojiText,
        toggleEmojiPicker
      };
    }
  };
  </script>
  
  <style scoped>
  .input-group {
    width: 100%;
  }
  </style>