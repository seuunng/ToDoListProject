<template>
    <div class="readTaskPage">
      <div><input type="checkbox"> </div>
      <i class="fa-regular fa-calendar"></i>
      {{ date }}
      <i class="fa-regular fa-flag"></i>
      <h4 class="">{{task-title}}</h4>
      {{ des }}
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
      return format(parsedDate, 'MM.dd');; // 예쁜 날짜 형식
    }
  }
}
</script>

<style>
.readTaskPage {
    margin-top: 20px;
}
.list-title{
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