<template>
    <div class="mb-3">
        <Toolbar>
            <template #start>
                <i class="pi pi-instagram p-toolbar-separator mr-1" /> <small class="mr-3">WOKO</small>
                <SplitButton label="Главная" :model="items" class="p-button-text p-button-plain" @click="router.push('/')"></SplitButton>
                <Button label="Админ" class="p-button-text p-button-plain mx-2" @click="router.push('/admin')" v-if="isAdmin" />
                <Button label="Статистика" class="p-button-text p-button-plain mx-2" @click="router.push('/statistic')" v-if="isChiefEditor" />
            </template>

            <template #end>
                <Button icon="pi pi-sign-in" class="p-button-text p-button-plain" @click="logout" />
            </template>
        </Toolbar>
    </div>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        const isAdmin = ref(false);
        const isChiefEditor = ref(false);

        onMounted(async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            isAdmin.value = user.permissions.length > 0 ? true : false;
            isChiefEditor.value = _.includes(JSON.parse(localStorage.getItem("user"))?.permissions, 6) ? true : false;
        });

        const items = ref([
            {
                label: "Статьи",
                icon: "pi pi-book",
                command: () => {
                    router.push("/article");
                },
            },
        ]);

        return {
            items,
            router,
            isAdmin,
            isChiefEditor,
            logout: () => {
                store.commit("user/userLogout");
                router.push("/login");
            },
        };
    },
};
</script>

<style></style>
