<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 w-full bg-pink-300 flex items-center justify-between px-6 py-3 shadow-md z-50">
      <button @click="goToHome">
        <h1 class="text-white text-xl font-bold">Cabeleireiro</h1>
      </button>
      <div class="text-white text-2xl flex items-center gap-2">
        <span>{{ displayName }}</span>
      </div>
    </header>

    <!-- Main content -->
    <main class="pt-24 max-w-4x2 mx-auto flex flex-col gap-6 p-4">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-pink-100 shadow-sm flex flex-col items-center justify-center p-6 m-4">
          <img
            src="../../quadrado branco.png"
            alt="Foto do Funcionário"
            class="w-50 h-70 bg-white mb-4"
          />
          <h3 class="font-bold mb-2 text-center">
            {{ funcionarioSelecionado?.nome || 'Funcionário não selecionado' }}
          </h3>
        </div>

        <!-- ▷ Coluna de Data + Serviços + Horários -->
        <div class="md:col-span-2 flex flex-col">

          <!-- ← Mês e mês atual → -->
          <div class="flex items-center justify-between mb-2">
            <!-- Desabilita voltar se for o mês atual -->
            <button
              @click="prevMonth"
              :disabled="isFirstMonth"
              :class="[
                'p-2 bg-pink-200 rounded transition-colors',
                isFirstMonth
                  ? 'opacity-50 cursor-not-allowed hover:bg-pink-200'
                  : 'hover:bg-pink-300'
              ]"
            >
              ‹
            </button>

            <span class="text-lg font-semibold">
              {{ format(month, 'MMMM yyyy', { locale: ptBR }) }}
            </span>

            <button
              @click="nextMonth"
              class="p-2 bg-pink-200 rounded hover:bg-pink-300"
            >
              ›
            </button>
          </div>

          
          <div class="overflow-x-auto pb-4 mb-4 no-scrollbar">
            <div class="flex">
              <div
                v-for="d in monthDays"
                :key="d.toISOString()"
                @click="selecionarDia(d)"
                :class="[
                  // cada item ocupa espaço igual (flex‑1) até o mínimo de 4rem
                  'flex-1 min-w-[4rem] flex flex-col items-center cursor-pointer p-2 rounded transition',
                  isSameDay(d, today)
                    ? 'bg-pink-500 text-white'
                    : 'hover:bg-pink-100'
                ]"
              >
                <span class="text-sm font-medium">{{ format(d, 'EEE', { locale: ptBR }) }}</span>
                <span class="text-lg">{{ format(d, 'dd') }}</span>
              </div>
            </div>
          </div>

          
          <div v-if="diaSelecionado" class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Serviços</h3>
            <div class="grid grid-cols-3 grid-rows-2 gap-2 mb-4">
              <button
                v-for="(s, i) in services"
                :key="i"
                @click="selectService(s)"
                :class="[ 
                  'px-3 py-1 rounded transition font-semibold ',
                  selectedService === s
                    ? 'bg-pink-400 text-white'
                    : 'bg-pink-200 hover:bg-pink-300 text-gray-800'
                ]"
              >
                {{ s }}
              </button>
            </div>
          </div>

          
          <div v-if="selectedService" class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Horários disponíveis:</h3>
            <div class="grid grid-cols-3 gap-2 mb-4">
              <button
                v-for="(horario, i) in horarios"
                :key="i"
                @click="selecionarHorario(horario)"
                :class="[ 
                  'px-3 py-1 rounded transition font-semibold ',
                  horarioSelecionado === horario
                    ? 'bg-pink-400 text-white'
                    : 'bg-pink-200 hover:bg-pink-300 text-gray-800'
                ]"
              >
                {{ horario }}
              </button>
            </div>

            
            <div v-if="horarioSelecionado" class="bg-gray-100 p-6 rounded text-center mt-10">
              <h2 class="text-lg font-bold mb-2">Resumo do Agendamento</h2>
              <p>
                <span class="font-semibold">Data:</span>
                {{ diaSelecionado?.data }} ({{ diaSelecionado?.diaSemana }})
              </p>
              <p><span class="font-semibold">Serviço:</span> {{ selectedService }}</p>
              <p><span class="font-semibold">Horário:</span> {{ horarioSelecionado }}</p>
              <p><span class="font-semibold">Profissional:</span> {{ funcionarioSelecionado?.nome }}</p>
              <button
                class="mt-3 px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
                @click="finalizar"
              >
                Finalizar Agendamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUser } from "../composables/useUser";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isSameDay,
  format,
  addMonths
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Funcionario { id: number; nome: string; }
interface Dia { diaSemana: string; data: string; }

export default defineComponent({
  name: "FuncionarioView",
  setup() {
    const { displayName } = useUser();
    const router = useRouter();
    const route  = useRoute();

    // hoje e mês reativo
    const today = new Date();
    const month = ref<Date>(new Date());

    // gera dias do mês (somente futuros, se for mês atual)
    const monthDays = computed<Date[]>(() =>
      eachDayOfInterval({
        start: startOfMonth(month.value),
        end:   endOfMonth(month.value)
      }).filter(d =>
        month.value.getMonth() !== today.getMonth()
          ? true
          : !isBefore(d, today)
      )
    );

    // se já estamos no mês/ano atual, não volta
    const isFirstMonth = computed(() =>
      month.value.getMonth() === today.getMonth() &&
      month.value.getFullYear() === today.getFullYear()
    );

    const prevMonth = () => {
      if (!isFirstMonth.value) {
        month.value = addMonths(month.value, -1);
      }
    };
    const nextMonth = () => {
      month.value = addMonths(month.value, +1);
    };

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

    // Nova lógica de serviço
    const services = ['Cabelo', 'Barba', 'Cabelo e barba', 'Pé', 'Mão', 'Pé e mão'];
    const selectedService = ref<string | null>(null);
    const selectService = (s: string) => {
      selectedService.value = s;
    };

    const goToHome = () => router.push("/");

    const selecionarDia = (dia: Date) => {
      diaSelecionado.value = {
        diaSemana: format(dia, 'EEE', { locale: ptBR }),
        data: format(dia, 'dd/MM', { locale: ptBR })
      };
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

    const goToScheduling = () => {
      router.push({
        name: "Scheduling",
        query: {
          funcionario: JSON.stringify(funcionarioSelecionado.value)
        }
      });
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
      displayName,
      goToHome,
      goToScheduling,
      dias,
      diaSelecionado,
      selecionarDia,
      horarios,
      horarioSelecionado,
      selecionarHorario,
      funcionarioSelecionado,
      finalizar,
      services,
      selectedService,
      selectService,
      month,
      monthDays,
      isFirstMonth,
      prevMonth,
      nextMonth,
      isSameDay, 
      today,
      format, 
      addMonths,
      ptBR,
    };
  },
});
</script>
