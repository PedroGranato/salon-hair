<template>
    <div class="min-h-screen flex flex-col bg-pink-100">
    <header class="bg-pink-300 p-3 text-white font-bold text-lg">Agenda</header>
    <!--principal -->
    <main class="flex-1 p-4">
    <div class="bg-white rounded shadow p-4">
        <div v-for="(funcionario, index) in funcionarios" :key="index" class="mb-4 border-b last:border-b-0 border-gray-300 pb-4">
            <!--Nome-->
            <h2 class="text-xl font-bold mb-2">{{ funcionario }}</h2>
            <!--hr-->
            <div class="flex flex-wrap gap-2">
            <button v-for="(horario, i) in horarios" :key="i" class="bg-pink-300 hover:bg-pink-400 text-white px-2 py-1 rounded transition">
                {{ horario }}
            </button>
            </div>
        </div>
    </div>
    </main>
    <!-- Footer -->
    <footer class="bg-pink-300 p-3 text-center text-white">
        <Button class="mr-4 hover:text-pink-600">Agenda</Button>
        <Button @click="goTofinances" class="hover:text-pink-600">Calendário</Button>
        <Button @click="goToclient" class="ml-4 hover:text-pink-600">Clientes</Button>
    </footer>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import router from '../router';

export default defineComponent({
    name: 'Calendar',
    setup() {
    const funcionarios = [
        'Funcionário 1',
        'Funcionário 2',
        'Funcionário 3',
        'Funcionário 4',
        'Funcionário 5',
    ];

    const horarios = [
    '7:00', '8:00', '9:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
];

const goTofinances = () => {
    router.push('/finances');
};

const goToclient = () => {
    router.push('/client');
};

return {
    funcionarios,
    horarios,
    goTofinances,
    goToclient,
};
    },
});
</script>