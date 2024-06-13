<template>
    <div class="MonthlyBoard">
        <h4  class="list-title">MonthlyBoard</h4>
        <h3  class="month">JUNE, 2024</h3>
        <div class="carlendar">
            <table  class="carlendar-table">
                <thead class="days_of_the_week">
                    <tr>
                        <td>월</td>
                        <td>화</td>
                        <td>수</td>
                        <td>목</td>
                        <td>금</td>
                        <td>토</td>
                        <td>일</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="week in 5" :key="week">
                      <td v-for="day in 7" :key="day" @click="createMemo(getDate(week, day))">
                        <div class="day-cell">
                          <div class="date-cell">{{ getDate(week, day) }}</div>
                          <div class="task-cell" >
                            <TaskBoxForCal 
                              :showdate="getDate(week, day).toString()"
                              :task="'Task ' + day"
                              :description="'Description for task ' + day"
                              :listtitle="'List title for task ' + day"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
            </table>
        </div>
      <CreateTask
        ref="createTaskModal"
        :date="selectedDate"
      />
    </div>
</template>

<script>
import { ref } from 'vue';
import TaskBoxForCal from '@/components/task_state/TaskBoxForCal.vue';
import CreateTask from '@/components/modal/CreateTask.vue';

export default {
  components: { TaskBoxForCal, CreateTask },
    name: 'MonthlyBoard',
    
    setup() {
    const createTaskModal = ref(null);
    const selectedDate = ref('');

    const getDate = (week, day) => {
      const current = new Date();
      current.setDate(current.getDate() - current.getDay() + day + (week - 1) * 7);
      return current.getDate();
    };
    
    const createMemo = (date) => {
      console.log("createTaskModal click!!")
      selectedDate.value = date.toString(); // 클릭된 날짜를 설정
      if (createTaskModal.value && createTaskModal.value.showModal) {
        createTaskModal.value.showModal();
      } else {
        console.error('createTaskModal is not available yet');
      }
    };

    return { createTaskModal, selectedDate, createMemo, getDate };
  },  
}
</script>

<style>
.MonthlyBoard{
}
.month{
  margin: 10px;
}
.carlendar-table{
    width: 80vw;
    border-collapse: collapse;
}
.carlendar-table td{
    padding: 0px;
    vertical-align: top; /* 내용이 위쪽에 정렬되도록 설정 */

}
.day-cell {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    padding: 3px;
    height: 120px;
}
.date-cell {
    text-align: left;
    }
  
.task-cell {
    flex-grow: 1;
    width: 100%;
  }
.carlendar-table .task-cell {
    width: 100%; /* 셀 너비 설정 */
    
  }
.days_of_the_week{
    text-align: center;
}
.carlendar{

}
</style>