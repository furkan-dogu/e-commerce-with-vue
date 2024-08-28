import authService from '@/services/authService'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {

    const user = authService.getUser()
    const isAuth = authService.isAuth()

    const login = async (userName: string, password: string) => {
        return await authService.login(userName, password)
    }

    const logout = async () => {
        await authService.logout()
    }

    return { user, isAuth, login, logout }
})