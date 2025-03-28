import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
import CreateMatch from "../components/CreateMatch.vue";
import DashBoard from "../components/DashBoard.vue"; // You can create this page for the user after login

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginForm
  },
  {
    path: "/login",
    name: "login2",
    component: LoginForm
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoard
  },
  {
    path: "/register",
    name: "register",
    component: RegisterForm // Add the Register route
  },
  {
    path: "/create-match",
    name: "create-match",
    component: CreateMatch // Define the route to create match page
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
