<template>
    <div class="min-h-screen flex flex-col bg-white">
        <!-- Header -->
        <div class="fixed top-0 left-0 w-full bg-pink-300 flex items-center justify-between px-6 py-3 shadow-md z-50">
            <Button @click="goToHome">
                <h1 class="text-white text-xl font-bold">Cabeleireiro</h1>
            </Button>
            <div class="text-white text-2xl flex items-center gap-2">
                <span>{{ displayName }}</span>
            </div>
        </div>

<div class=" mt-24">

<!-- Barra de Datas  -->
<div class="max-w-2xl mx-auto overflow-x-auto whitespace-nowrap border-gray-300 pb-4 mb-8">
    <div class="inline-flex space-x-3">
        <div v-for="(dia, index) in dias" :key="index" 
            class="cursor-pointer flex flex-col items-center text-center px-4 py-2"
            @click="selecionarDia(dia)">
            <div :class="{ 'border-b-4 border-pink-500': diaSelecionado?.data === dia.data }">
                <span class="font-semibold text-base">{{ dia.diaSemana }}</span>
                <span class="text-sm text-gray-600">{{ dia.data }}</span>
            </div>
        </div>
    </div>
</div>

<!-- Seção de Horários -->
<div v-if="diaSelecionado" class="mb-6">
    <h2 class="text-lg font-bold mb-2 text-center">Horários Disponíveis</h2>
    <div class="flex flex-wrap justify-center gap-2">
        <button v-for="(horario, index) in horarios" :key="index" 
                class="px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 transition"
                @click="selecionarHorario(horario)">
            {{ horario }}
        </button>
    </div>
</div>

<!-- Seção de Profissionais (Agora fica centralizado corretamente) -->
<section v-if="horarioSelecionado" class="flex flex-col items-center">
    <h2 class="text-lg font-bold mb-2 text-center">Nosso Time</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
        <div v-for="(profissional, index) in profissionais" :key="index"
            class="bg-pink-100 shadow-sm flex flex-col items-center justify-between p-4 rounded-lg w-[180px] h-[260px]">
            <img src="../../quadrado branco.png" alt="Foto do profissional" 
                class="w-36 h-36 bg-white mb-2">
            <h3 class="font-bold text-center">{{ profissional.nome }}</h3>
            <button @click="selecionarProfissional(profissional)"
                    class="bg-pink-300 text-white px-4 py-2 rounded hover:bg-pink-400 transition">
                Selecionar
            </button>
        </div>
    </div>
</section>

            <!-- Finalização -->
            <div v-if="profissionalSelecionado" class="mb-6 mx-auto max-w-lg px-6 mt-6 text-center">
                <h2 class="text-lg font-bold mb-2">Resumo do Agendamento</h2>
                <div class="bg-gray-100 p-6 rounded w-full inline-block text-left">
                    <p v-if="diaSelecionado"><span class="font-semibold">Data:</span> {{ diaSelecionado.data }} ({{ diaSelecionado.diaSemana }})</p>
                    <p><span class="font-semibold">Horário:</span> {{ horarioSelecionado }}</p>
                    <p><span class="font-semibold">Profissional:</span> {{ profissionalSelecionado.nome }}</p>
                    <button class="mt-4 px-4 py-2 bg-pink-300 text-white rounded hover:bg-pink-500 transition" @click="finalizar">Finalizar Agendamento</button>
                </div>
            </div>
            </div>
            
    <div class="fixed bottom-4 right-4 z-50">
        <button class="bg-pink-500 hover:bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-md transition duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.613 7.613 0 0 0 8.002 0 7.62 7.62 0 0 0 0 7.621a7.59 7.59 0 0 0 1.073 3.897L0 16l4.584-1.196A7.618 7.618 0 0 0 8 15.243a7.62 7.62 0 0 0 7.621-7.622 7.57 7.57 0 0 0-2.02-5.295Zm-5.599 12a6.4 6.4 0 0 1-3.273-.89l-.235-.139-2.721.71.727-2.652-.153-.272a6.392 6.392 0 0 1-.969-3.405 6.435 6.435 0 0 1 6.434-6.436 6.405 6.405 0 0 1 4.538 1.88 6.42 6.42 0 0 1 1.885 4.54 6.435 6.435 0 0 1-6.433 6.434Zm3.527-4.82c-.193-.098-1.148-.566-1.326-.63-.178-.064-.308-.096-.437.097-.129.193-.503.63-.617.759-.114.129-.228.145-.421.048-.193-.097-.813-.299-1.548-.955-.572-.51-.958-1.14-1.07-1.333-.112-.193-.012-.297.085-.394.087-.086.193-.228.29-.342.098-.114.129-.193.194-.322.065-.129.032-.242-.016-.34-.048-.097-.437-1.057-.599-1.453-.157-.378-.317-.327-.437-.327l-.374-.007c-.129 0-.34.048-.518.242-.178.193-.678.662-.678 1.611s.694 1.874.79 2.003c.097.129 1.365 2.086 3.312 2.926 1.162.5 1.618.542 2.204.455.355-.053 1.148-.469 1.311-.922.161-.453.161-.841.112-.922-.048-.08-.177-.129-.37-.228Z"/>
        </svg>
        </button>
    </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from "../composables/useUser";
const { displayName } = useUser()

interface Profissional {
    nome: string;
}

interface Dia {
    diaSemana: string;
    data: string;
}

export default defineComponent({
    name: "Agendamento",
    setup() {
        const { displayName } = useUser();
        const router = useRouter();

        const goToHome = () => router.push('/');

        return {
            displayName,
            goToHome,
        };
    },
    data() {
        return {
        profissionais: [
            { nome: 'Funcionário 1' },
            { nome: 'Funcionário 2' },
            { nome: 'Funcionário 3' },
            { nome: 'Funcionário 4' },
            { nome: 'Funcionário 5' },
            ],
        dias:[
        { diaSemana: "Sex", data: "14/03" },
            { diaSemana: "Sab", data: "15/03" },
            { diaSemana: "Dom", data: "16/03" },
            { diaSemana: "Seg", data: "17/03" },
            { diaSemana: "Ter", data: "18/03" },
            { diaSemana: "Qua", data: "19/03" },
            { diaSemana: "Qui", data: "20/03" },
            { diaSemana: "Sex", data: "21/03" },
            { diaSemana: "Sab", data: "22/03" },
            { diaSemana: "Dom", data: "23/03" },
            { diaSemana: "Seg", data: "24/03" },
            { diaSemana: "Ter", data: "25/03" },
            { diaSemana: "Qua", data: "26/03" },
            { diaSemana: "Qui", data: "27/03" },
            { diaSemana: "Sex", data: "28/03" },
            { diaSemana: "Sab", data: "29/03" },
            { diaSemana: "Dom", data: "30/03" },
            { diaSemana: "Seg", data: "31/03" },
            { diaSemana: "Ter", data: "01/04" },
            { diaSemana: "Qua", data: "02/04" },
            { diaSemana: "Qui", data: "03/04" },
            { diaSemana: "Sex", data: "04/04" },
            { diaSemana: "Sab", data: "05/04" },
            { diaSemana: "Dom", data: "06/04" },
            
            ],
        horarios:[  
            '7:00', '8:00', '9:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        ],
            diaSelecionado: null as Dia | null,
            horarioSelecionado: null as string | null,
            profissionalSelecionado: null as Profissional | null,
        };
    },
    methods: {
        selecionarDia(dia: Dia) {
            this.diaSelecionado = dia;
            this.horarioSelecionado = null;
            this.profissionalSelecionado = null;
        },
        selecionarHorario(horario: string) {
            this.horarioSelecionado = horario;
            this.profissionalSelecionado = null;
        },
        selecionarProfissional(profissional: Profissional) {
            this.profissionalSelecionado = profissional;
        },
        finalizar() {
            if (this.diaSelecionado && this.horarioSelecionado && this.profissionalSelecionado) {
                alert(`Agendamento finalizado!\n\nData: ${this.diaSelecionado.data} (${this.diaSelecionado.diaSemana})\nHorário: ${this.horarioSelecionado}\nProfissional: ${this.profissionalSelecionado.nome}`);
            } else {
                alert("Por favor, complete todas as seleções antes de finalizar o agendamento.");
            }
        },
    },
});
</script>
