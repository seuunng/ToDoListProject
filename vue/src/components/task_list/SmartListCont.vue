<template>
  <div class="SmartListCont">
    <table class="list-table">
      <tr v-for="list in lists" :key="list.id">
        <td  class="list-cell">
          <ListItemsBox
            :icon="''"
            :listTitle="''"
            :listColor="''"
            :itemCount="''"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
  
<script>
  export default {
    name: 'SmartListCont',
    data() {
      return {
        
      };
    },
    props:{
      value: String,
    },
    methods: {
      
    }
  };
</script>
  
<style scoped>
  .SmartListCont {

  }
</style>