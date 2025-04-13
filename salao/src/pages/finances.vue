<template>
    <!-- principal -->
    <div class="w-screen min-h-screen flex flex-col bg-pink-100">
        <!-- Header + Cabeçalho da tabela -->
        <div class="bg-pink-300 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <!-- Nome do funcionário -->
            <select class="bg-pink-300 text-gray-800 font-semibold text-left  px-2 py-1 focus:outline-none border-none cursor-pointer" v-model="func.Func1">
                <option value="Denise">Denise</option>
                <option value="Ana">Ana</option>
                <option value="Maria">Maria</option>
                <option value="João">João</option>
            </select>
            <!-- Data (input date) -->
            <div class="flex-1 flex justify-center">
                <input
                    type="date"
                    class="bg-pink-300 text-gray-800 rounded px-2 py-1 focus:outline-none border-none cursor-pointer"
                    v-model="dateValue"
                />
            </div>
        </div>

        <!-- Cabeçalho da tabela ocupando toda a largura -->
        <div class="bg-pink-300 text-gray-800 font-semibold text-left grid grid-cols-4 border-t border-black">
            <span class="border-r border-black px-4 py-2">Cliente</span>
            <span class="border-r border-black px-4 py-2">Pagamento</span>
            <span class="border-r border-black px-4 py-2">Serviço</span>
            <span class="px-4 py-2">Valor</span>
        </div>

        <!-- Conteúdo principal (Tabela) -->
        <main class="flex-1 p-4 overflow-auto">
            <div class="overflow-x-auto">
                <table class="min-w-full text-left bg-pink-200 border border-black">
                    <tbody>
                        <tr
                            v-for="(item, index) in appointments"
                            :key="index"
                            class="border-b last:border-b-0 hover:bg-pink-50 grid grid-cols-4"
                        >
                            <td class="px-4 py-2 border-r border-black">{{ item.cliente }}</td>
                            <td class="px-4 py-2 border-r border-black">{{ item.pagamento }}</td>
                            <td class="px-4 py-2 border-r border-black">{{ item.servico }}</td>
                            <td class="px-4 py-2">{{ item.valor }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>


        <!-- Bloco fixo para total e filtros (ALINHADO COM A TABELA) -->
        <div class="bg-pink-100 p-4 grid grid-cols-4 border-t border-black text-gray-800 font-semibold">
            <!-- Total -->
            <span class="border-r border-black px-4 py-2">{{ footerForm.totalLabel }}</span>
            <!-- Pagamento -->
            <select class="border-r border-black px-4 py-2 bg-pink-100 focus:outline-none" v-model="footerForm.paymentFilter">
                <option value="Todos">Todos</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartão">Cartão</option>
            </select>
            <!-- Serviço -->
            <select class="border-r border-black px-4 py-2 bg-pink-100 focus:outline-none" v-model="footerForm.serviceFilter">
                <option value="Todos">Todos</option>
                <option value="Pé">Pé</option>
                <option value="Mão">Mão</option>
                <option value="Pé e mão">Pé e mão</option>
            </select>
            <!-- Valor total -->
            <span class="px-4 py-2">{{ footerForm.totalValue }}</span>
        </div>

        <!-- Footer fixo na parte inferior -->
        <footer class="bg-pink-300 p-3 text-center text-white">
            <Button @click="goToCalendar" class="mr-4 hover:text-pink-600">Agenda</Button>
            <Button  class="hover:text-pink-600">Calendário</Button>
            <Button @click="goToclient" class="ml-4 hover:text-pink-600">Clientes</Button>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import router from '../router';


interface Appointment {
    cliente: string;
    pagamento: string;
    servico: string;
    valor: string;
}

export default defineComponent({
    name: 'AppointmentsTable',
    props: {

        // Data
        defaultDate: {
            type: String,
            default: '2025-03-15',
        },
        // Lista serviços
        appointments: {
            type: Array as () => Appointment[],
            default: () => [],
        },
    },
    setup(props) {
        const dateValue = ref(props.defaultDate);
        // Formulário
        const footerForm = ref({
            totalLabel: 'Total',
            paymentFilter: 'Todos',
            serviceFilter: 'Todos',
            totalValue: 'R$0', // Somente leitura
        });

        const func = ref({
            Func1: 'Denise',
            Func2: 'Ana',
            Func3: 'Maria',
            Func4: 'João',
        })
        const goToCalendar = () => {
        router.push('/Appointment');
    };
        const goToclient = () => {
        router.push('/client');
};

        return {
            dateValue,
            footerForm,
            goToCalendar,
            goToclient,
            func,

        };
    },
});
</script>
