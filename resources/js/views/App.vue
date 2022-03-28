<template>
    <component :is="layout + '-layout'" v-if="layout"></component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";

export default {
    setup() {
        const route = useRoute();

        return {
            layout: computed(() => route.meta.layout),
        };
    },
    components: {
        AdminLayout,
        MainLayout,
        LoginLayout,
    },
};
</script>

<style scoped></style>
