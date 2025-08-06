import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Signup from './components/SignUp.vue'
import Dashboard from './components/Dashboard.vue'
import Home from './components/Home.vue'


const routes = [
  { path: '/', component:Home},
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        next();
      } else {
        next('/login');
      }
    }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
