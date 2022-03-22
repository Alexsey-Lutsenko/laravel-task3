<template>
    <component :is="layout + '-layout'" v-if="layout"></component>
</template>

<script>
import {computed} from "vue"
import { useRoute } from "vue-router";
import AdminLayout from "./layouts/AdminLayout"

export default {
    setup() {
        const route = useRoute();

        return {
            layout: computed(() => route.meta.layout)
        }
    },
    components: {
        AdminLayout
    }
}
</script>

<style scoped>

</style>
