<template>
    <div class="d-flex justify-content-center flex-column align-items-center title-content">
        <h1>Вход</h1>
        <h6 v-if="message.text" class="text-danger">{{ message.text }}</h6>

        <form action="" class="my-4">
            <span class="p-float-label">
                <InputText id="username" type="text" v-model="email" class="input-style" />
                <label for="username">Имя пользователя</label>
            </span>
            <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>

            <span class="p-float-label mt-4">
                <InputText id="password" type="password" v-model="password" class="input-style" />
                <label for="password">Пароль</label>
            </span>
            <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>

            <div class="d-flex justify-content-center mt-4">
                <Button label="Войти" class="p-button-raised p-button-success p-button-text" @click.prevent="login" />
            </div>
        </form>

        <div v-for="user of users" :key="user.id">
            <p class="mb-1"><b>Имя пользователя: </b>{{ user.email }}, <b>Пароль: </b>{{ user.password }}</p>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    setup() {
        onMounted(async () => {
            await store.dispatch("user/index");
        });

        const email = ref();
        const password = ref();
        const store = useStore();
        const router = useRouter();
        const users = computed(() => store.getters["user/getUsers"]);
        const errors = computed(() => store.getters["user/getErrors"]);
        const message = computed(() => store.getters["getMessage"]);

        return {
            email,
            password,
            users,
            errors,
            message,
            login: async () => {
                await store.dispatch("user/login", { email: email.value, password: password.value });
                router.push("/");
            },
        };
    },
};
</script>

<style scoped>
.title-content {
    min-height: 500px;
}
.input-style {
    width: 300px;
}
</style>
