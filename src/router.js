import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import EntryMorning from './views/EntryMorning.vue'
import EntryEvening from './views/EntryEvening.vue'
import History from './views/History.vue'
import Stats from './views/Stats.vue'
import Info from './views/Info.vue'
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
            name: 'Start',
            component: Dashboard
        },
        {
            path: '/entryMorning',
            name: 'Morgeneintrag erfassen',
            component: EntryMorning
        },
        {
            path: '/entryEvening',
            name: 'Abendeintrag erfassen',
            component: EntryEvening
        },
        {
            path: '/history',
            name: 'Verlauf',
            component: History
        },
        {
            path: '/stats',
            name: 'Statistik',
            component: Stats
        },
        {
            path: '/info',
            name: 'Info',
            component: Info
        },
        {
            path: '/ex',
            name: 'Beispiele',
            component: Examples
        },

    ]
})
