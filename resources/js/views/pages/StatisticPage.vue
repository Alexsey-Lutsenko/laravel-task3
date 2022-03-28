<template>
    <div class="d-flex justify-content-center align-items-center flex-column">
        <h1>Статистика статей</h1>

        <div class="mt-4 w-50">
            <div v-for="article of articles" :key="article.id" class="mt-3">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <img :src="article.url_preview" class="img-preview" />
                        <div class="d-flex flex-column justify-content-center mx-3">
                            <h5>{{ article.article }}</h5>
                            <div>Описание: {{ article.description }}</div>
                            <div>Автор: {{ article.user }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const articles = computed(() => store.getters["article/getArticles"]);

        onMounted(async () => {
            await store.dispatch("article/index");
        });

        onBeforeUnmount(() => {
            store.commit("article/addArticles", []);
            store.commit("article/addArticle", {});
        });

        return {
            articles,
            getContent: (id) => router.push(`/article/${id}`),
        };
    },
};
</script>

<style scoped>
.img-preview {
    width: 50px;
    height: 50px;
    border-radius: 3px;
}
</style>
