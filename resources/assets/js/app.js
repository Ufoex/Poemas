/*eslint-disable not-new*/
require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VeeValidate, { Validator } from 'vee-validate';
import esLocale from 'vee-validate/dist/locale/es';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueRouter, Axios, VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(VeeValidate);
Validator.localize('es', esLocale);

const App = Vue.component('app-component', require('./components/layouts/App'));
const poemIndex = Vue.component('poem-index', require('./components/poem/Index'));
const poemCreate = Vue.component('poem-create', require('./components/poem/Create'));
const poemEdit = Vue.component('poem-edit', require('./components/poem/Edit'));

const routes = [
    {
        name: 'poem-index',
        path: '/poem',
        component: poemIndex
    },
    {
        name: 'poem-create',
        path: '/poem/create',
        component: poemCreate
    },
    {
        name: 'poem-edit',
        path: '/poem/:id/edit',
        component: poemEdit
    },
];

const router = new VueRouter({
    mode:'history',
    routes: routes
});

new Vue({
    router
}).$mount('#app');
