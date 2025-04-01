import { createRouter, createWebHistory } from 'vue-router';

import client from '../pages/client.vue';
import finances from '../pages/finances.vue';
import Home from '../pages/home.vue'; 
import Appointment from '../pages/Appointment.vue';
import scheduling from '../pages/Scheduling.vue';

import path from 'path';

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
];

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes,
});

export default router;