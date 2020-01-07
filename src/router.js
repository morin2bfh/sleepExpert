import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import EntryMorning from './views/EntryMorning.vue'
import EntryEvening from './views/EntryEvening.vue'
import SleepingWindow from './views/SleepingWindow.vue'
import History from './views/History.vue'
import Stats from './views/Stats.vue'
import Info from './views/Info.vue'
import Tips from './views/Tips.vue'
import Knowledge from './views/Knowledge.vue'
import Exercises from './views/Exercises.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import HistoryEveningEntry from './views/HistoryEveningEntry.vue'
import HistoryMorningEntry from './views/HistoryMorningEntry.vue'
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
            path: '/sleepingWindow',
            name: 'Schlaffenster',
            component: SleepingWindow,
            beforeEnter: checkUser
        },
        {
            path: '/history',
            name: 'Verlauf',
            component: History,
            beforeEnter: checkUser
        },
        {
            path: '/history/historyEveningEntry/:id',
            name: 'AbendeintragHistory',
            component: HistoryEveningEntry,
            beforeEnter: checkUser
        },
        {
            path: '/history/historyMorningEntry/:id',
            name: 'MorgeneintragHistory',
            component: HistoryMorningEntry,
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
            path: '/tips',
            name: 'Tipps',
            component: Tips,
            beforeEnter: checkUser
        },
        {
            path: '/knowledge',
            name: 'Wissen',
            component: Knowledge,
            beforeEnter: checkUser
        },
        {
            path: '/exercises',
            name: 'Progressive Muskelrelaxion',
            component: Exercises,
            beforeEnter: checkUser
        },
    ]
})