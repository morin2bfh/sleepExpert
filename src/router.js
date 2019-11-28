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

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/entryMorning',
            name: 'entryMorning',
            component: EntryMorning
        },
        {
            path: '/entryEvening',
            name: 'entryEvening',
            component: EntryEvening
        },
        {
            path: '/history',
            name: 'history',
            component: History
        },
        {
            path: '/stats',
            name: 'stats',
            component: Stats
        },
        {
            path: '/info',
            name: 'info',
            component: Info
        },
        {
            path: '/ex',
            name: 'infoex',
            component: Examples
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
