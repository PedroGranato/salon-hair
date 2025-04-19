<template>
    <div class="w-screen min-h-screen bg-white text-gray-700">
    <!--header-->
    <div class=" fixed top-0 left-0 w-full bg-pink-300 flex items-center justify-between px-6 py-3 shadow-md z-50">
        <h1 class="text-white text-xl font-bold">Cabeleireiro</h1>
        <div class="text-white text-2xl flex items-center gap-2">
            <span>{{ displayName }}</span>
        </div>
    </div>

    <!--banner -->
    <header class="relative mt-40">
        <div class="h-48 bg-[url('https://via.placeholder.com/1920x400')] bg-cover bg-center flex items-center justify-center">
        <div class="relative z-10 flex flex-col items-center text-black text-center px-4">
            <h1 class="text-2xl md:text-3xl font-bold mb-2">Cabeleireiro</h1>
            <p class="text-sm md:text-lg">Agende já seu horário</p>
        <button class="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow-md" @click="goToCalendar">Agenda</button>
        </div>
        </div>
    </header>

    <!--team-->
<section class="py-8 px-4">
        <h2 class="text-xl md:text-2xl font-semibold mb-4">Nosso Time</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="(funcionario, index) in funcionarios" :key="index" class="bg-pink-100 shadow-sm flex flex-col items-center justify-center p-6 m-4">
            <img src="../../quadrado branco.png" alt="Teste" class="w-50 h-70 bg-white mb-4" >
            <h3 class="font-bold mb-2 text-center">{{ funcionario.nome }}</h3>
            <p class="text-sm text-center">{{ funcionario.func }}</p>
        </div>
    </div>
</section>

    <!--PP-->
    <section class="py-8 px-4">
        <div class="flex flex-col md:flex-row md:justify-between gap-4">
        <!--price-->
        <div class="w-full md:w-1/2">
            <h2 class="text-xl md:text-2xl font-semibold mb-4">Preços</h2>
            <div class="space-y-2">
            <div class="flex justify-between">
                <span>Corte</span>
                <span>R$ 40</span>
            </div>
            <div class="flex justify-between">
                <span>Mão</span>
                <span>R$ 40</span>
            </div>
            <div class="flex justify-between">
                <span>Pé</span>
                <span>R$ 40</span>
            </div>
            <div class="flex justify-between">
                <span>Pé e mão</span>
                <span>R$ 40</span>
            </div>
            </div>
        </div>
        <!--picture-->
        <div class="w-full md:w-1/2">
            <div class="bg-pink-100 w-full h-64 flex items-center justify-center rounded-md shadow-sm">
            <span class="text-gray-600 text-center">Foto Salão</span>
            </div>
        </div>
        </div>
    </section>

    <!--Whatsapp-->
    <div class="fixed bottom-4 right-4 z-50">
        <button class="bg-pink-500 hover:bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-md transition duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
            <path
            d="M13.601 2.326A7.613 7.613 0 0 0 8.002 0 7.62 7.62 0 0 0 0 7.621a7.59 7.59 0 0 0 1.073 3.897L0 16l4.584-1.196A7.618 7.618 0 0 0 8 15.243a7.62 7.62 0 0 0 7.621-7.622 7.57 7.57 0 0 0-2.02-5.295Zm-5.599 12a6.4 6.4 0 0 1-3.273-.89l-.235-.139-2.721.71.727-2.652-.153-.272a6.392 6.392 0 0 1-.969-3.405 6.435 6.435 0 0 1 6.434-6.436 6.405 6.405 0 0 1 4.538 1.88 6.42 6.42 0 0 1 1.885 4.54 6.435 6.435 0 0 1-6.433 6.434Zm3.527-4.82c-.193-.098-1.148-.566-1.326-.63-.178-.064-.308-.096-.437.097-.129.193-.503.63-.617.759-.114.129-.228.145-.421.048-.193-.097-.813-.299-1.548-.955-.572-.51-.958-1.14-1.07-1.333-.112-.193-.012-.297.085-.394.087-.086.193-.228.29-.342.098-.114.129-.193.194-.322.065-.129.032-.242-.016-.34-.048-.097-.437-1.057-.599-1.453-.157-.378-.317-.327-.437-.327l-.374-.007c-.129 0-.34.048-.518.242-.178.193-.678.662-.678 1.611s.694 1.874.79 2.003c.097.129 1.365 2.086 3.312 2.926 1.162.5 1.618.542 2.204.455.355-.053 1.148-.469 1.311-.922.161-.453.161-.841.112-.922-.048-.08-.177-.129-.37-.228Z"
            />
        </svg>
        </button>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from "../composables/useUser";
import router from '../router';
const { displayName } = useUser()

interface Funcionario {
    nome: string;
    func: string;
}

export default defineComponent({
    name: 'HomePage',
    setup() {
    const { displayName } = useUser();
    const router = useRouter();
    const funcionarios: Funcionario[] = [
        { nome: 'Funcionário 1', func: 'Funções' },
        { nome: 'Funcionário 2', func: 'Funções' },
        { nome: 'Funcionário 3', func: 'Funções' },
        { nome: 'Funcionário 4', func: 'Funções' },
        { nome: 'Funcionário 5', func: 'Funções' },
    ];
    const goToCalendar = () => {
        router.push('/scheduling');
    };

    return {
        displayName,
        funcionarios,
        goToCalendar,
    };
    },
});
</script>

<style>
html, body {
    overflow-x: hidden;
}
</style>