import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthPage from '@/views/AuthPage'
import UserPage from '@/views/UserPage'
import FriendsPage from '@/views/FriendsPage'
import PublicationPage from '@/views/PublicationPage'

Vue.use(VueRouter);

const USER_URL = '/user/id=:id'

export default new VueRouter({
    base: '/',
    mode: 'history',
    routes: [
        { path: '/', component: AuthPage, name: AuthPage.name },
        { path: USER_URL, component: UserPage, name: UserPage.name },
        { path: USER_URL.concat('/friends/'), component: FriendsPage, name: FriendsPage.name },
        { path: USER_URL.concat('/publication/:publicationId'), component: PublicationPage, name: PublicationPage.name },

    ]
});