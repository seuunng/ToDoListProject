import { createRouter, createWebHistory } from 'vue-router';
import BasicBoard from '@/views/boards/BasicBoard.vue';
import ReadTaskPage from '@/views/ReadTaskPage.vue';
import DailyBoard from '@/views/boards/DailyBoard.vue';
import MonthlyBoard from '@/views/boards/MonthlyBoard.vue';
import WeeklyBoard from '@/views/boards/WeeklyBoard.vue';
import KanbanBoard from '@/views/boards/KanbanBoard.vue';
import TimeLineBoard from '@/views/boards/TimeLineBoard.vue';
import AcountInfo from '@/components/modal/AcountInfo.vue';
import CreateList from '@/components/modal/CreateList.vue';
import CreateTask from '@/components/modal/CreateTask.vue';
import Login from '@/components/modal/Login.vue';
import ReadTaskModal from '@/components/modal/ReadTaskModal.vue';
import Search from '@/components/modal/Search.vue';
import SignUp from '@/components/modal/SignUp.vue';
import UpdatePW from '@/components/modal/UpdatePW.vue';
import UpdateSimplePW from '@/components/modal/UpdateSimplePW.vue';
import Setting from '@/components/modal/Setting.vue';


const routes =[
    {path: '/BasicBoard', name: 'BasicBoard', component: BasicBoard},
    {path: '/ReadTaskPage', name: 'ReadTaskPage', component: ReadTaskPage},
    {path: '/DailyBoard', name: 'DailyBoard', component: DailyBoard},
    {path: '/MonthlyBoard', name: 'MonthlyBoard', component: MonthlyBoard},
    {path: '/WeeklyBoard', name: 'WeeklyBoard', component: WeeklyBoard},
    {path: '/KanbanBoard', name: 'KanbanBoard', component: KanbanBoard},
    {path: '/TimeLineBoard', name: 'TimeLineBoard', component: TimeLineBoard},
    {path: '/AcountInfo', name: 'AcountInfo', component: AcountInfo},
    {path: '/CreateList', name: 'CreateList', component: CreateList},
    {path: '/CreateTask', name: 'CreateTask', component: CreateTask},
    {path: '/Login', name: 'Login', component: Login},
    {path: '/ReadTaskModal', name: 'ReadTaskModal', component: ReadTaskModal},
    {path: '/Search', name: 'Search', component: Search},
    {path: '/SignUp', name: 'SignUp', component: SignUp},
    {path: '/UpdatePW', name: 'UpdatePW', component: UpdatePW},
    {path: '/UpdateSimplePW', name: 'UpdateSimplePW', component: UpdateSimplePW},
    {path: '/Setting', name: 'Setting', component: Setting},
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });
  
  export default router;