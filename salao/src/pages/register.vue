<template>
    <div class="flex items-center justify-center min-h-screen bg-pink-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md">
        <h2 class="text-2xl font-bold text-center text-black">Criar Conta</h2>
        <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input
            type="text"
            v-model="username"
            placeholder="ex: Arthur da Silva"
            required
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
            type="email"
            v-model="email"
            placeholder="juliana@email.com"
            required
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Telefone</label>
            <input
            type="tel"
            v-model="tel"
            placeholder="11999999999"
            required
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Data de nascimento</label>
            <input
            type="date"
            v-model="birthdate"
            required
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Senha</label>
            <input
            type="password"
            v-model="password"
            placeholder="mínimo 6 caracteres"
            required
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
        </div>
        <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
        >
            Registrar
        </button>
        </form>
        <div class="text-center">
        <span class="text-sm text-gray-600">Já tem uma conta?</span>
        <router-link to="/login" class="ml-1 text-pink-500 hover:underline">
            Entrar
        </router-link>
        </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const birthdate = ref('')
const tel = ref('')

const router = useRouter()

const handleRegister = async () => {
    try {
        const res = await axios.post('http://localhost:5173/api/auth/register', {
    username: username.value,
    email: email.value,
    telephone: tel.value,
    birthdate: birthdate.value,
    password: password.value,
})

    alert('Conta criada com sucesso!')
    router.push('/login')
    } catch (err) {
    console.error(err)
    alert('Erro ao registrar. Verifique os dados.')
    }
}

</script>
