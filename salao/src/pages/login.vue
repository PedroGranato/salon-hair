<template>
<div class="flex items-center justify-center min-h-screen bg-pink-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md">
    <h2 class="text-2xl font-bold text-center text-black">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
            type="email"
            v-model="email"
            required
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        </div>
        <div>
        <label class="block text-sm font-medium text-gray-700">Senha</label>
        <input
            type="password"
            v-model="password"
            required
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        </div>
        <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
        >
        Entrar
        </button>
    </form>
    <div class="text-center">
        <span class="text-sm text-gray-600">Ainda não tem uma conta?</span>
        <router-link to="/register" class="ml-1 text-pink-500 hover:underline">
        Criar conta
        </router-link>
    </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()

interface LoginResponse {
  token: string
  // se seu backend retornar mais dados do usuário, adicione aqui
  // user?: { id: string; username: string; email: string }
}

const handleLogin = async () => {
  try {
    const res = await axios.post<LoginResponse>('/api/auth/login', {
      email: email.value,
      password: password.value
    })

    const { token } = res.data

    // guarda token e e‑mail no localStorage
    localStorage.setItem('token', token)
    localStorage.setItem(
      'user',
      JSON.stringify({ email: email.value /*, ...res.data.user */ })
    )

    // opcional: define header default
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    router.push('/') // redireciona após login
  } catch (err) {
    console.error(err)
    alert('Credenciais inválidas')
  }
}
</script>