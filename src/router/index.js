import 'bootstrap/dist/css/bootstrap.min.css';
import { createRouter, createWebHistory } from "vue-router";
import TaskView from "../views/TaskView.vue";
import ManageTaskView from "../views/ManageTaskView.vue";
import LoginView from "../views/LoginView.vue";
import authService from "../services/authService";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: TaskView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/manage-task",
    name: "ManageTask",
    component: ManageTaskView,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// before each route to check if user is authenticated
router.beforeEach((to, from, next) => {
  // it will look if some component have requiresAuth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // check if user is authenticated
    if (!authService.isAuthenticated()) {
      // if not, redirect to login
      next({ name: "Login" });
    } else {
      // if yes, continue
      next();
    }
  } else {
    // if no requiresAuth, continue
    next();
  }
});

export default router;
