import { createRouter, createWebHistory } from 'vue-router';
import BasicBoard from '@/views/boards/BasicBoard.vue';
import ReadTaskPage from '@/views/ReadTaskPage.vue';
import DailyBoard from '@/views/boards/DailyBoard.vue';
import MonthlyBoard from '@/views/boards/MonthlyBoard.vue';
import WeeklyBoard from '@/views/boards/WeeklyBoard.vue';
import KanbanBoard from '@/views/boards/KanbanBoard.vue';
import TimeLineBoard from '@/views/boards/TimeLineBoard.vue';


const routes =[
    {path: '/BasicBoard', name: 'BasicBoard', component: BasicBoard},
    {path: '/ReadTaskPage', name: 'ReadTaskPage', component: ReadTaskPage},
    {path: '/DailyBoard', name: 'DailyBoard', component: DailyBoard},
    {path: '/MonthlyBoard', name: 'MonthlyBoard', component: MonthlyBoard},
    {path: '/WeeklyBoard', name: 'WeeklyBoard', component: WeeklyBoard},
    {path: '/KanbanBoard', name: 'KanbanBoard', component: KanbanBoard},
    {path: '/TimeLineBoard', name: 'TimeLineBoard', component: TimeLineBoard},
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });
  
  export default router;