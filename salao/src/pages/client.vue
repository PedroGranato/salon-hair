<template>
<div class="w-screen min-h-screen flex flex-col bg-gray-100 p-4 pb-20">
    <!-- Barra de pesquisa -->
    <div class="flex items-center bg-gray-300 px-4 py-2 rounded-lg mb-4">
    <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar cliente..."
        class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-600"
    />
    <SearchIcon class="w-5 h-5 text-gray-600" />
    </div>

    <!-- Lista de clientes usando flex-wrap -->
    <div class="flex flex-wrap -mx-1">
    <div 
        v-for="client in filteredClients" 
        :key="client.name" 
        class="w-full md:w-1/2 px-1 mb-2"
    >
        <div class="bg-gray-300 rounded-lg overflow-hidden transition-all duration-300">
        <!-- Parte fechada: altura fixa para manter o cartão compacto -->
        <div
            @click="toggleClient(client)"
            class="h-12 px-2 flex items-center justify-between cursor-pointer"
        >
            <span class="text-gray-800 font-semibold">{{ client.name }}</span>
            <ChevronDownIcon v-if="!client.open" class="w-5 h-5 text-gray-600" />
            <ChevronUpIcon v-else class="w-5 h-5 text-gray-600" />
        </div>
        <!-- Conteúdo expandido: aparece abaixo do cartão fechado -->
        <transition name="fade">
            <div v-if="client.open" class="bg-white p-3">
            <p><strong>Nome:</strong> {{ client.name }}</p>
            <p><strong>Data de nascimento:</strong> {{ client.birthdate }}</p>
            <p><strong>Número:</strong> {{ client.phone }}</p>
            <p><strong>Email:</strong> {{ client.email }}</p>
            <p><strong>Pacote:</strong> {{ client.package || 'Nenhum' }}</p>
            <div v-if="client.dates?.length" class="flex gap-2 mt-2">
                <button
                v-for="date in client.dates"
                :key="date"
                class="bg-pink-300 text-white px-2 py-1 text-sm rounded-md border hover:bg-pink-400 transition"
                >
                {{ date }}
                </button>
            </div>
            </div>
        </transition>
        </div>
    </div>
    </div>

    <!-- Footer fixo -->
    <footer class="bg-pink-300 p-3 text-center text-white w-full fixed bottom-0 left-0">
    <Button @click="goToCalendar" class="mr-4 hover:text-pink-600">Agenda</Button>
    <Button @click="goTofinances" class="hover:text-pink-600">Calendário</Button>
    <Button @click="goToClients" class="ml-4 hover:text-pink-600">Clientes</Button>
    </footer>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')

const clients = ref([
{ name: 'Ana Souza', birthdate: '12/05/1990', phone: '11 987654321', email: 'ana.souza@example.com', package: '', dates: [], open: false },
{ name: 'Bruno Lima', birthdate: '03/11/1985', phone: '11 912345678', email: 'bruno.lima@example.com', package: 'Corte + Barba', dates: ['15/04/2025 14:00'], open: false },
{ name: 'Carlos Mendes', birthdate: '27/08/1993', phone: '11 923456789', email: 'carlos.mendes@example.com', package: '', dates: [], open: false },
{ name: 'Daniela Ferreira', birthdate: '09/02/1988', phone: '11 934567890', email: 'daniela.ferreira@example.com', package: 'Pacote SPA', dates: ['05/04/2025 10:00', '12/04/2025 10:00'], open: false }
])

const toggleClient = (client) => {
client.open = !client.open
}

const filteredClients = computed(() => {
return clients.value.filter(client =>
    client.name.toLowerCase().includes(searchQuery.value.toLowerCase())
)
})

const goToCalendar = () => {
    router.push('/Appointment');
}

const goTofinances = () => {
    router.push('/finances');
}

const goToClients = () => {
    router.push('/client');
}  
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
opacity: 0;
transform: scaleY(0);
}
</style>
