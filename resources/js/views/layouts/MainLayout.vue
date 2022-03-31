<template>
    <div class="mb-3">
        <Toolbar>
            <template #start>
                <i class="pi pi-instagram p-toolbar-separator mr-1" /> <small class="mr-3">WOKO</small>
                <Button label="Главная" class="p-button-text p-button-plain" @click="router.push('/')"></Button>
                <Button label="Статьи" icon="pi pi-book" class="p-button-text p-button-plain mx-2" @click="router.push('/article')"></Button>
                <Button label="Админ" class="p-button-text p-button-plain mx-2" @click="router.push('/admin')" v-if="isAdmin" />
                <Button label="Статистика" class="p-button-text p-button-plain mx-2" @click="router.push('/statistic')" v-if="isChiefEditor" />
            </template>

            <template #end>
                <Button icon="pi pi-sign-in" class="p-button-text p-button-plain" @click.prevent="logout" />
            </template>
        </Toolbar>
    </div>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        const router = useRouter();
        const store = useStore();
        const permissions = ref();

        const isAdmin = ref(false);
        const isChiefEditor = ref(false);

        onMounted(async () => {
            permissions.value = JSON.parse(localStorage.getItem("permissions"));

            isAdmin.value = permissions.value?.length > 0 ? true : false;
            isChiefEditor.value = _.includes(JSON.parse(localStorage.getItem("permissions")), 6) ? true : false;
        });

        onUpdated(() => {
            JSON.parse(localStorage.getItem("permissions"));
        });

        return {
            router,
            isAdmin,
            isChiefEditor,
            logout: async () => {
                await store.dispatch("user/logout");
            },
        };
    },
};
</script>

<style></style>
