<template>
    <div class="d-flex align-items-center flex-column" v-if="article">
        <router-link to="/article">Вернуться к статьям</router-link>
        <h1>{{ article.article }}</h1>
        <div v-html="article.content" class="ProseMirror"></div>
    </div>
</template>

<script>
import { onMounted, computed, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        onMounted(async () => {
            await store.dispatch("article/index", { id: route.params.id });
        });

        onBeforeUnmount(() => {
            store.commit("article/addArticles", []);
            store.commit("article/addArticle", {});
        });

        const route = useRoute();
        const store = useStore();

        const article = computed(() => store.getters["article/getArticle"]);

        return { article };
    },
};
</script>

<style></style>
