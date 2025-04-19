import { ref, computed } from 'vue'

export function useUser() {
  const raw = localStorage.getItem('user')
  const user = ref(raw ? JSON.parse(raw) as { username: string; email: string } : null)
  const displayName = computed(() => user.value?.username || '')
  return { user, displayName }
}