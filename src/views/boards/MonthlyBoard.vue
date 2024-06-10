<template>
    <div class="MonthlyBoard">
        <h4  class="list-title">MonthlyBoard</h4>
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
                      <td v-for="day in 7" :key="day">
                        <div class="day-cell">
                          <div class="date-cell">{{ date }}</div>
                          <div class="task-cell">
                            <TaskBoxForCal :task="'Task ' + day" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TaskBoxForCal from '@/components/task_state/TaskBoxForCal.vue';
export default {
  components: { TaskBoxForCal },
    name: 'MonthlyBoard',
    data() {
        return {
        date: 1, // 예시를 위해 임시로 설정한 날짜
        Task: '커밋하기'
        };
    },
    methods: {
      
    }
}
</script>

<style>
.MonthlyBoard{
    
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
    padding: 10px;
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