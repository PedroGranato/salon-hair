<template>
    <div class="min-h-screen flex flex-col bg-white">
      <!-- Header -->
      <header class="fixed top-0 left-0 w-full bg-pink-300 flex items-center justify-between px-6 py-3 shadow-md z-50">
        <button @click="goToHome">
          <h1 class="text-white text-xl font-bold">Cabeleireiro</h1>
        </button>
        <button class="text-white text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A10.971 10.971 0 0112 15c2.486 0 4.779.908 6.879 2.404M15 11a3 3 0 11-6 0 3 3 6 0z" />
          </svg>
        </button>
      </header>
  
      <!--principal-->
      <main class="pt-24 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-4">
        <!--Card do Funcionário-->
        <div class="w-full md:w-1/3">
          <div class="bg-pink-100 shadow-sm flex flex-col items-center justify-center p-6 m-4">
            <img src="../../quadrado branco.png" alt="Foto do Funcionário" class="w-50 h-70 bg-white mb-4" />
            <h2 class="text-xl font-bold text-gray-800">{{ funcionarioSelecionado?.nome || 'Funcionário não selecionado' }}</h2>
          </div>
        </div>
  
        <!--Seleção de Data-->
        <div class="w-full md:w-2/3">
          <div class="max-w-full overflow-x-auto whitespace-nowrap border-gray-300 pb-4 mb-4">
            <div class="inline-flex space-x-3">
              <div
                v-for="(dia, index) in dias"
                :key="index" class="cursor-pointer flex flex-col items-center text-center px-4 py-2" @click="selecionarDia(dia)">
                <div :class="{ 'border-b-4 border-pink-500': diaSelecionado?.data === dia.data }">
                  <span class="font-semibold text-base">{{ dia.diaSemana }}</span>
                  <br/>
                  <span class="text-sm text-gray-600">{{ dia.data }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Seleção de horário (Aparece após selecionar a data) -->
          <div v-if="diaSelecionado" class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Horários disponíveis:</h3>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="(horario, index) in horarios"
                :key="index"
                :class="['px-4 py-2 rounded transition', horarioSelecionado === horario ? 'hover:bg-pink-300 text-white' : 'bg-pink-200']"
                @click="selecionarHorario(horario)"
            >
                {{ horario }}
            </button>
            </div>
        </div>

        <!--Resumo do Agendamento-->
        <div v-if="horarioSelecionado" class="bg-gray-100 p-6 rounded text-center">
            <h2 class="text-lg font-bold mb-2">Resumo do Agendamento</h2>
            <p><span class="font-semibold">Data:</span> {{ diaSelecionado.data }} ({{ diaSelecionado.diaSemana }})</p>
            <p><span class="font-semibold">Horário:</span> {{ horarioSelecionado }}</p>
            <p><span class="font-semibold">Profissional:</span> {{ funcionarioSelecionado?.nome }}</p>
            <button class="mt-4 px-4 py-2 bg-pink-300 text-white rounded hover:bg-pink-500 transition" @click="finalizar"> Finalizar Agendamento </button>
        </div>
        </div>
    </main>
    <div class="fixed bottom-4 right-4 z-50">
        <button
        class="bg-pink-500 hover:bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-md transition duration-300">
        </button>
    </div>
    </div>
</template>

  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  interface Funcionario {
    id: number;
    nome: string;
  }
  
  interface Dia {
    diaSemana: string;
    data: string;
  }
  
  export default defineComponent({
    name: "FuncionarioView",
    setup() {
    const router = useRouter();
    const route = useRoute();

      const dias = ref<Dia[]>([
        { diaSemana: "Sex", data: "14/03" },
        { diaSemana: "Sab", data: "15/03" },
        { diaSemana: "Dom", data: "16/03" },
        { diaSemana: "Seg", data: "17/03" },
        { diaSemana: "Ter", data: "18/03" },
        { diaSemana: "Qua", data: "19/03" },
        { diaSemana: "Qui", data: "20/03" },
        { diaSemana: "Sex", data: "21/03" },
      ]);
  
      // Horários disponíveis
      const horarios = ref<string[]>(["08:00", "09:00", "10:00", "11:00", "13:00", "15:00"]);

      // Selecionados pelo usuário
      const diaSelecionado = ref<Dia | null>(null);
      const horarioSelecionado = ref<string | null>(null);
      const funcionarioSelecionado = ref<Funcionario | null>(null);

      const goToHome = () => router.push("/");

      const selecionarDia = (dia: Dia) => {
        diaSelecionado.value = dia;
        horarioSelecionado.value = null; // Reset horário ao mudar de dia
      };

      const selecionarHorario = (horario: string) => {
        horarioSelecionado.value = horario;
      };

      const finalizar = () => {
        if (diaSelecionado.value && horarioSelecionado.value && funcionarioSelecionado.value) {
          alert(
            `Agendamento finalizado!\n\nData: ${diaSelecionado.value.data} (${diaSelecionado.value.diaSemana})\nHorário: ${horarioSelecionado.value}\nProfissional: ${funcionarioSelecionado.value.nome}`
          );
        } else {
          alert("Por favor, selecione uma data e um horário para finalizar o agendamento.");
        }
      };
  
      // Pega funcionário da query
      onMounted(() => {
        const queryFuncionario = route.query.funcionario as string | undefined;
        if (queryFuncionario) {
          try {
            funcionarioSelecionado.value = JSON.parse(queryFuncionario);
          } catch (error) {
            console.error("Erro ao parsear query:", error);
          }
        }
      });
  
      return {
        goToHome,
        dias,
        diaSelecionado,
        selecionarDia,
        horarios,
        horarioSelecionado,
        selecionarHorario,
        funcionarioSelecionado,
        finalizar,
      };
    },
  });
  </script>
  