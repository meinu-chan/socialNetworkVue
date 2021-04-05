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
        { path: '/', component: AuthPage, name: AuthPage.name },
        {
            path: '/user/id=:id', component: UserPage, name: UserPage.name, children: [
                { path: 'friends/', component: FriendsPage, name: FriendsPage.name },
                { path: 'publication/:publicationId', component: PublicationPage, name: PublicationPage.name },

            ]
        },
    ]
});