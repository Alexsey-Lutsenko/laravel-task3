<template>
    <h1>Управление категориями</h1>
</template>

<script>
import {ref, computed, onMounted} from "vue";
import {useStore, mapGetters} from "vuex"

export default {
    name: "CategoryAdminComponent",
    setup() {
        const store = useStore();

        return {
            computed: {}
        }
    }
}
</script>

<style scoped>

</style>
