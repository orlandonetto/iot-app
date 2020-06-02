import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Main from '../views/Main'
import Login from '../views/Login'
import Register from '../views/Register'
import ComponentCreate from '../views/ComponentCreate'
import ComponentUpdate from '../views/ComponentUpdate'
import Store from '../store'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/main',
        component: Main
    },
    {
        path: '/component/create',
        component: ComponentCreate
    },
    {
        path: '/component/update',
        component: ComponentUpdate
    },
    // Others
    {
        path: "*",
        redirect: "/"
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const authenticated = Store.getters.isLogged;

    if (authRequired && !authenticated)
        return next('/login');

    if (!authRequired && authenticated)
        return next('/main')

    next();
});

export default router
