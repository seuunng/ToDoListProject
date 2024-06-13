<template>
  <div class="TaskCont">
    <table class="task-table">
      <tr v-for="task in tasks" :key="task.id">
        <td  class="task-cell">
          <TaskBox :task="task.text" :date="formatDate(task.date)"></TaskBox>
        </td>
      </tr>
    </table>
  </div>
</template>
  
  <script>
  import TaskBox from '@/components/task_state/TaskBox.vue';
  import { format } from 'date-fns';

  export default {
    components: {
      TaskBox,
    },
    name: 'TaskCont',
    data() {
      return {
        
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
      return format(parsedDate, 'MM.dd');; // 예쁜 날짜 형식
    }
      
    }
  };
  </script>
  
  <style scoped>
  .TaskCont {

  }
  .task-table {
    width: 50vw;
    max-width: 600px; /* 최대 너비 설정 */
    min-width: 400px; /* 최소 너비 설정 */
    border-collapse: collapse; /* 테이블 셀 간격 제거 */
  }
  .task-table td {
    padding: 10px;
  }
  .task-table .task-cell {
    width: 100%; /* 셀 너비 설정 */
  }
  </style>