  <template>
    <button type="button" class="btn btn-primary btn-sm basic-button">
        <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'btn',
    data() {
      return {
      };
    },
    props: {
    buttonClass: {
      type: String,
      default: 'btn-primary' // 기본 버튼 클래스 설정 (Bootstrap 사용 시)
    }
  },
    methods: {
       
      
    }
  };
  </script>
  
  <style scoped>
  .basic-button {
    margin: 0px;
  }
  </style>