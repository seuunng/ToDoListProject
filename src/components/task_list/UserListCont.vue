<template>
    <div class="UserListCont">
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
import ListItemsBox from '../task_state/ListItemsBox.vue';

  export default {
    name: 'UserListCont',
    components: { ListItemsBox },
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
  .UserListCont {

  }
  </style>