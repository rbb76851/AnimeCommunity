import {createRouter, createWebHashHistory} from "vue-router";
import Home from '../Pages/Home.vue'
import Details from '../Pages/Details.vue'
import Synopsis from '../components/Synopsis.vue'
import Episodes from '../components/Episodes.vue'
import Characters from '../components/Characters.vue'
import Reactions from '../components/Reactions.vue'
import Franchise from '../components/Franchise.vue'

const routes: Array<any> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    }, {
        path: '/details',
        name: 'details',
        component: Details,
        children: [
            {
                path: "synopsis",
                name: "synopsis",
                component: Synopsis,
            }, {
                path: "episodes",
                name: "episodes",
                component: Episodes,
            }, {
                path: "characters",
                name: "characters",
                component: Characters,
            }, {
                path: "reactions",
                name: "reactions",
                component: Reactions,
            }, {
                path: "franchise",
                name: "franchise",
                component: Franchise,
            },
        ]
    }

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router