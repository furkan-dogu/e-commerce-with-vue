import authService from '@/services/authService'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref()
    const isAuth = ref(false)
    const userId = computed(() => user.value?.id)

    const loadUser = async () => {
        user.value = await authService.getUser()
        isAuth.value = await authService.isAuth()
    }

    const login = async (userName: string, password: string) => {
        const response = await authService.login(userName, password)
        await loadUser() 
        return response
    }

    const logout = async () => {
        await authService.logout()
        user.value = null
        isAuth.value = false
    }

    loadUser()

    return { user, userId, isAuth, login, logout, loadUser }
})
