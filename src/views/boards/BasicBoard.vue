<template>
  <div class="BasicBoard">
    <h4 class="list-title">{{list-title}}</h4>    
    <div class="task-table">
      <SimpleInputTask @task-created="addTask"></SimpleInputTask>
    </div>
    <div>
      <TaskCont/>
    </div>
  </div>
</template>

<script>
import TaskCont from '@/components/task_list/TaskCont.vue';
import SimpleInputTask from '@/components/task_state/SimpleInputTask.vue';

export default {
  name: 'readTaskPage',
    components: {
      SimpleInputTask,
      TaskCont,
    },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    
  }
}
</script>

<style>
.BasicBoard {
    
}
.list-title{
}

</style>