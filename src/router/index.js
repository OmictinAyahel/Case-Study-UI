import { createRouter, createWebHistory } from 'vue-router';
import TaskView from '../views/TaskView.vue';
import ManageTaskView from '../views/ManageTaskView.vue';

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: TaskView,
    props: true,  
  },
  {
    path: '/manage-task',
    name: 'ManageTask',
    component: ManageTaskView,
    props: true, 
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
