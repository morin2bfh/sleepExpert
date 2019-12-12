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
import HistoryEveningEntry from './views/HistoryEveningEntry.vue'
import Tipps from './views/Tipps.vue'
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
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: checkUser
        },
        {
            path: '/entryMorning',
            name: 'Morgeneintrag',
            component: EntryMorning,
            beforeEnter: checkUser
        },
        {
            path: '/entryEvening',
            name: 'Abendeintrag',
            component: EntryEvening,
            beforeEnter: checkUser
        },
        {
            path: '/history',
            name: 'Verlauf',
            component: History,
            beforeEnter: checkUser
        },
        {
            path: '/stats',
            name: 'Statistik',
            component: Stats,
            beforeEnter: checkUser
        },
        {
            path: '/info',
            name: 'Informationen',
            component: Info,
            beforeEnter: checkUser
        },
        {
            path: '/ex',
            name: 'Beispiele',
            component: Examples,
            beforeEnter: checkUser
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {   
        path: '/historyEveningEntry',
        name: 'Abendeintrag History',
        component: HistoryEveningEntry
        },
        {   
            path: '/tipps',
            name: 'Tipps',
            component: Tipps,
            },
    ]
})
