<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { reactive } from 'vue';

    const authStore = useAuthStore()

    const loginForm = reactive({
        userName: "",
        password: "",
    })

    const handleLogin = async () => {
        const isAuth = await authStore.login(loginForm.userName, loginForm.password)

        if(isAuth) {
            location.href = "/"
        } else {
            alert("user not found")
        }
    }

</script>

<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <p>
                UserName 
                <input required v-model="loginForm.userName" />
            </p>
            <p>
                Password 
                <input required type="password" v-model="loginForm.password" />
            </p>
            <button type="submit">Login</button>
        </form>

        <router-link to="/">Home</router-link>
    </div>
</template>
