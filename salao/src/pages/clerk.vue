<template>
    <div>
      <h1>Dados do Funcionário Selecionado</h1>
      <div v-if="funcionario">
        <p>ID: {{ funcionario.id }}</p>
        <p>Nome: {{ funcionario.nome }}</p>
      </div>
      <div v-else>
        <p>Nenhum funcionário recebido.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  interface Funcionario {
    id: number;
    nome: string;
  }
  
  export default defineComponent({
    name: 'clerk',
    setup() {
      const route = useRoute();
      const funcionario = ref<Funcionario | null>(null);
  
      onMounted(() => {
        const queryFuncionario = route.query.funcionario as string | undefined;
        if (queryFuncionario) {
          try {
            funcionario.value = JSON.parse(queryFuncionario);
          } catch (error) {
            console.error("Erro ao parsear query:", error);
          }
        }
      });
  
      return {
        funcionario,
      };
    },
  });
  </script>