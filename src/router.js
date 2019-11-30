import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import EntryMorning from './views/EntryMorning.vue'
import EntryEvening from './views/EntryEvening.vue'
import History from './views/History.vue'
import Stats from './views/Stats.vue'
import Info from './views/Info.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Examples from './views/Examples.vue'
import { auth } from './fb'

Vue.use(Router)

const checkUser = (to, from, next) => {
    const user = auth.currentUser;
    if (!user) next('/login')
    else next()
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            beforeEnter: checkUser
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            beforeEnter: checkUser
        },
        {
            path: '/entryMorning',
            name: 'entryMorning',
            component: EntryMorning,
            beforeEnter: checkUser
        },
        {
            path: '/entryEvening',
            name: 'entryEvening',
            component: EntryEvening,
            beforeEnter: checkUser
        },
        {
            path: '/history',
            name: 'history',
            component: History,
            beforeEnter: checkUser
        },
        {
            path: '/stats',
            name: 'stats',
            component: Stats,
            beforeEnter: checkUser
        },
        {
            path: '/info',
            name: 'info',
            component: Info,
            beforeEnter: checkUser
        },
        {
            path: '/ex',
            name: 'infoex',
            component: Examples,
            beforeEnter: checkUser
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },


    ]
})
