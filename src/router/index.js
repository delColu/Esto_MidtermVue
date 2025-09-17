import Home from '../Pages/Home.vue'
import About from '../Pages/About.vue'
import Fruitfacts from '../Pages/Fruitfacts.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},
    {path: '/Fruitfacts', name: 'Fruitfacts', component: Fruitfacts}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

