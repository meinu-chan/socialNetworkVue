import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthPage from '@/views/AuthPage'
import UserPage from '@/views/UserPage'
import FriendsPage from '@/views/FriendsPage'
import PublicationPage from '@/views/PublicationPage'

Vue.use(VueRouter);

export default new VueRouter({
    base: '/',
    mode: 'history',
    routes: [
        { path: '/', component: AuthPage },
        { path: '/user/id=:id', component: UserPage },
        { path: '/friends/id=:id', component: FriendsPage },
        { path: '/publication/id=:id', component: PublicationPage },
    ]
});