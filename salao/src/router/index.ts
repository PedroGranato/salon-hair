import { createRouter, createWebHistory } from 'vue-router';

import client from '../pages/client.vue';
import finances from '../pages/finances.vue';
import Home from '../pages/home.vue'; 
import Appointment from '../pages/Appointment.vue';
import scheduling from '../pages/Scheduling.vue';
import timings from '../pages/timings.vue';
import clerk from '../pages/clerk.vue';
import login from '../pages/login.vue';
import register from '../pages/register.vue';

import { c } from 'vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P';

const routes = [
{
    path: '/',
    component: Home,
},
{
    path: '/appointment',
    component: Appointment,
},
{
    path: '/client',
    component: client,
},
{
    path: '/finances',
    component: finances,
},
{
    path: '/Scheduling',
    component: scheduling,
},
{
    path: '/timings',
    component: timings,
},
{
    path: '/clerk',
    name: 'clerk',
    component: clerk,
},

{
    path: '/login',
    component: login,
},
{
    path: '/register',
    component: register,
},
];

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes,
});

export default router;