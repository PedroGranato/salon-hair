<template>
  <div class="w-screen min-h-screen flex flex-col bg-pink-100">
    <!-- Header -->
    <div class="bg-pink-300 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 relative">
      <!-- Seleção de funcionário -->
      <select
        class="bg-pink-300 text-gray-800 font-semibold px-2 py-1 focus:outline-none border-none cursor-pointer"
        v-model="func.Func1"
      >
        <option>Denise</option>
        <option>Ana</option>
        <option>Maria</option>
        <option>João</option>
      </select>

      <div class="flex-1 flex justify-center">
        <input
          type="date"
          class="bg-pink-300 text-gray-800 rounded px-2 py-1 focus:outline-none border-none cursor-pointer"
          v-model="dateValue"
        />
      </div>
      <!-- Botão adicionar no topo direito -->
      <button
        @click="showAddModal = true"
        class="absolute top-4 right-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-1 px-3 rounded"
      >
        + Adicionar Serviço
      </button>
    </div>

    <!-- Tabela -->
    <div class="flex-grow">
      <div class="overflow-x-auto">
        <table class="table-fixed w-full border-separate border-spacing-0">
          <thead>
            <tr class="bg-pink-300 text-gray-800 font-semibold text-left">
              <th class="border-r border-black px-4 py-2 w-1/4">Cliente</th>
              <th class="border-r border-black px-4 py-2 w-1/4">Pagamento</th>
              <th class="border-r border-black px-4 py-2 w-1/4">Serviço</th>
              <th class="border-r border-black px-4 py-2 w-1/6">Valor</th>
              <th class="px-2 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in appointments"
              :key="index"
              class="hover:bg-pink-50 text-gray-800">
              <td class="border-r border-black px-4 py-2">{{ item.cliente }}</td>
              <td class="border-r border-black px-4 py-2">{{ item.pagamento }}</td>
              <td class="border-r border-black px-4 py-2">{{ item.servico }}</td>
              <td class="border-r border-black px-4 py-2">{{ item.valor }}</td>
              <td class="px-4 py-2 text-center">
                <button
                  @click="removeAppointment(index)"
                  class="text-gray hover:text-gray-700 text-lg font-bold"
                  title="Excluir"
                >×</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Total e Filtros -->
    <div class="bg-pink-100 p-4 grid grid-cols-4 border-t border-black text-gray-800 font-semibold">
      <span class="px-4 py-2">Total</span>
      <select class="px-4 py-2 bg-pink-100 focus:outline-none" v-model="filters.paymentFilter">
        <option value="Todos">Todos</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Pix">Pix</option>
        <option value="Cartão">Cartão</option>
      </select>
      <select class="px-4 py-2 bg-pink-100 focus:outline-none" v-model="filters.serviceFilter">
        <option value="Todos">Todos</option>
        <option value="Pé">Pé</option>
        <option value="Mão">Mão</option>
        <option value="Pé e mão">Pé e mão</option>
      </select>
      <span class="px-4 py-2">{{ totalValue }}</span>
    </div>

    <!-- Footer -->
    <footer class="bg-pink-300 p-3 text-center text-white">
      <Button @click="goToCalendar" class="mr-4 hover:text-pink-600">Agenda</Button>
      <Button class="hover:text-pink-600">Calendário</Button>
      <Button @click="goToclient" class="ml-4 hover:text-pink-600">Clientes</Button>
    </footer>

    <!-- Modal Adicionar Serviço -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4 text-pink-600">Adicionar Serviço</h2>

        <form @submit.prevent="addService">
          <input v-model="newService.cliente" type="text" placeholder="Cliente" class="w-full mb-2 p-2 border rounded" required />
          <select v-model="newService.pagamento" class="w-full mb-2 p-2 border rounded" required>
            <option disabled value="">Forma de pagamento</option>
            <option>Dinheiro</option>
            <option>Pix</option>
            <option>Cartão</option>
          </select>
          <select v-model="newService.servico" class="w-full mb-2 p-2 border rounded" required>
            <option disabled value="">Serviço</option>
            <option>Pé</option>
            <option>Mão</option>
            <option>Pé e mão</option>
          </select>
          <input v-model="newService.valor" type="text" placeholder="Valor (ex: R$50)" class="w-full mb-4 p-2 border rounded" required />

          <div class="flex justify-end gap-2">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import router from '../router';
import axios from 'axios';

interface Appointment {
  cliente: string;
  pagamento: string;
  servico: string;
  valor: string;
}

export default defineComponent({
  name: 'AppointmentsTable',
  setup() {
    const dateValue = ref(new Date().toISOString().substr(0, 10));
    const func = ref({ Func1: 'Denise' });

    const appointments = ref<Appointment[]>([]);

    const filters = ref({
      paymentFilter: 'Todos',
      serviceFilter: 'Todos'
    });

    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get<Appointment[]>('/api/appointment', {
          params: {
            paymentFilter: filters.value.paymentFilter,
            serviceFilter: filters.value.serviceFilter,
            funcionario: func.value.Func1,
            date: dateValue.value
          }
        });
        appointments.value = data;
      } catch (err) {
        console.error('Erro ao carregar agendamentos', err);
      }
    };

    onMounted(fetchAppointments);
    watch(filters, fetchAppointments, { deep: true });
    watch(dateValue, fetchAppointments);
    watch(func, fetchAppointments, { deep: true });

    const totalValue = computed(() => {
      const sum = appointments.value
        .reduce((acc, cur) => acc + Number(cur.valor.replace(/[^\d]/g, '')), 0);
      return `R$${sum}`;
    });

    const showAddModal = ref(false);
    const newService = ref<Appointment>({
      cliente: '',
      pagamento: '',
      servico: '',
      valor: '',
    });

    const addService = () => {
      appointments.value.push({ ...newService.value });
      newService.value = { cliente: '', pagamento: '', servico: '', valor: '' };
      showAddModal.value = false;
    };

    const removeAppointment = (index: number) => {
      appointments.value.splice(index, 1);
    };

    const goToCalendar = () => router.push('/Appointment');
    const goToclient = () => router.push('/client');

    return {
      dateValue,
      func,
      appointments,
      filters,
      totalValue,
      showAddModal,
      newService,
      addService,
      removeAppointment,
      goToCalendar,
      goToclient,
    };
  },
});
</script>
