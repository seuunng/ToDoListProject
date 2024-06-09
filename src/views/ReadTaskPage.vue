<template>
    <div class="readTaskPage">
        <h4 class="list-title">{{list-title}}</h4>
        <SimpleInputTask @task-created="addTask"></SimpleInputTask>
        <table>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>
                <TaskBox :task="task.text" :date="formatDate(task.date)"></TaskBox>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>

<script>
import SimpleInputTask from '@/components/task_state/SimpleInputTask.vue';
import TaskBox from '@/components/task_state/TaskBox.vue';
import { format } from 'date-fns';

export default {
  name: 'readTaskPage',
    components: {
      SimpleInputTask,
      TaskBox,
    },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    addTask(task) {
      this.tasks.push({ id: Date.now(), text: task, date: new Date() });
    },
    formatDate(date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) {
        return 'Invalid Date';
      }
      return format(parsedDate, 'MM/dd');; // 예쁜 날짜 형식
    }
  }
}
</script>

<style>
.readTaskPage{
    
}
.list-title{
}
</style>