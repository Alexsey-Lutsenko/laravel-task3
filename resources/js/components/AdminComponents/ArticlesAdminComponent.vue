<template>
    <div class="d-flex flex-column align-items-center">
        <h1>Управление статьями</h1>

        <div class="my-5 w-75">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Добавить" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" :disabled="!isAuthor && !isAdmin" />
                </template>
            </Toolbar>

            <DataTable
                :value="articles"
                dataKey="id"
                :loading="loading"
                :resizableColumns="true"
                columnResizeMode="fit"
                v-model:selection="selectedArticle"
                selectionMode="single"
                @rowSelect="onRowSelect"
                class="p-datatable-sm"
                editMode="row"
                :scrollable="true"
                scrollHeight="400px"
            >
                <Column field="id" header="id" :sortable="true" style="max-width: 5rem; padding-left: 10px"></Column>
                <Column header="Превью" style="max-width: 8rem">
                    <template #body="slotProps">
                        <img
                            :src="
                                slotProps.data.url_preview
                                    ? slotProps.data.url_preview
                                    : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
                            "
                            class="product-image"
                        />
                    </template>
                </Column>
                <Column field="article" header="Статья"></Column>
                <Column field="description" header="Описание"></Column>
                <Column :exportable="false" style="max-width: 10rem">
                    <template #body="slotProps">
                        <Button
                            icon="pi pi-eye"
                            :class="[
                                slotProps.data.is_publish == 1 ? 'p-button-success' : 'p-button-danger',
                                'p-button-rounded p-button-outlined mr-2',
                            ]"
                            @click="published(slotProps.data.id, slotProps.data.is_publish)"
                            :disabled="!isAuthor && !isAdmin"
                        />
                        <Button
                            icon="pi pi-pencil"
                            class="p-button-rounded p-button-success mr-2"
                            @click="editArticle(slotProps.data)"
                            :disabled="!isAuthor && !isAdmin"
                        />
                        <Button
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-danger"
                            @click="confirmDeleteArticle(slotProps.data)"
                            :disabled="!isAdmin"
                        />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="articleDialog" :style="{ width: '450px' }" header="Управление Категориями" :modal="true" class="p-fluid">
            <div class="field d-flex align-items-center">
                <div>
                    <label for="article">Превью</label>
                    <div class="input__wrapper">
                        <input
                            name="file"
                            type="file"
                            id="imgPreview"
                            class="input input__file"
                            multiple
                            @change="selectImgPreview($event)"
                            :disabled="isImgLoad"
                        />
                        <label for="imgPreview" class="input__file-button">
                            <span class="input__file-button-text"><i class="pi pi-download"></i> Выберите файл</span>
                        </label>
                    </div>
                </div>
                <div class="mx-5" v-if="article?.tmp_preview">
                    <img :src="article.tmp_preview" class="product-image-select" />
                </div>
                <Button v-if="article?.tmp_preview" label="" icon="pi pi-times" class="p-button-text" @click="selectImgDelete" />
            </div>
            <div class="field">
                <label for="article">Статья</label>
                <InputText
                    id="article"
                    v-model.trim="article.article"
                    required="true"
                    :class="{ 'p-invalid': submitted && (!article.article || errors.article) }"
                />
                <small class="p-error" v-if="submitted && (!article.article || errors.article)">
                    {{ errors.article ?? "Название не может быть пустым" }}
                </small>
            </div>
            <div class="field">
                <label for="description">Описание</label>
                <InputText
                    id="description"
                    v-model.trim="article.description"
                    required="true"
                    :class="{ 'p-invalid': submitted && (!article.description || errors.description) }"
                />
                <small class="p-error" v-if="submitted && (!article.description || errors.description)">
                    {{ errors.description ?? "Название не может быть пустым" }}
                </small>
            </div>

            <template #footer>
                <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveArticle" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteArticleDialog" :style="{ width: '450px' }" header="Внимание" :modal="true">
            <div class="confirmation-content d-flex align-items-center">
                <i class="pi pi-exclamation-triangle mx-2" style="font-size: 2rem" />
                <span v-if="article"
                    >Вы точно хотите удалить <b>{{ article.article }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="Нет" icon="pi pi-times" class="p-button-text" @click="deleteArticleDialog = false" />
                <Button label="Да" icon="pi pi-check" class="p-button-text" @click="deleteArticle" />
            </template>
        </Dialog>

        <Dialog
            v-if="selectedArticle.article"
            :header="`Редактирование контента статьи ${selectedArticle.article ?? ''}`"
            v-model:visible="displayContentDialog"
            :style="{ width: '50vw' }"
            :maximizable="true"
            :modal="true"
        >
            <tiptap :article="selectedArticle" />
            <template #footer>
                <Button label="Закрыть" icon="pi pi-times" @click="displayContentDialog = false" class="p-button-text" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import Tiptap from "../TipTap/Tiptap";

export default {
    components: { Tiptap },
    name: "ArticleAdminComponent",
    setup(props, { emit }) {
        const store = useStore();
        const submitted = ref(false);
        const articleDialog = ref(false);
        const deleteArticleDialog = ref(false);
        const displayContentDialog = ref(false);
        const article = ref({});
        const selectedArticle = ref({});
        const selectImg = ref("");
        const isImgLoad = ref(false);
        const imageLoad = ref({});
        const editor = ref(null);

        const isEditor = ref();
        const isAuthor = ref();
        const isAdmin = ref();

        const articles = computed(() => store.getters["article/getArticles"]);
        const errors = computed(() => store.getters["article/getErrors"]);
        const loading = computed(() => store.getters["getLoader"]);
        watch(loading, () => {});

        onMounted(async () => {
            await store.dispatch("article/index");

            const permissions = JSON.parse(localStorage.getItem("permissions"));

            isEditor.value = _.intersection(permissions, [1]).length === 1;
            isAuthor.value = _.intersection(permissions, [3, 4, 5]).length === 3;
            isAdmin.value = _.intersection(permissions, [1, 2, 3, 4, 5]).length === 5;
        });

        onBeforeUnmount(() => {
            store.commit("article/addArticles", []);
            store.commit("article/addArticle", {});
        });

        const openNew = () => {
            isImgLoad.value = false;
            imageLoad.value = "";
            article.value = {};
            submitted.value = false;
            articleDialog.value = true;
        };

        const hideDialog = () => {
            articleDialog.value = false;
            submitted.value = false;
        };

        const editArticle = (data) => {
            article.value = Object.assign({}, data);
            isImgLoad.value = article.value.url_preview ? true : false;
            article.value.tmp_preview = article.value.url_preview;
            imageLoad.value = "";
            articleDialog.value = true;
        };

        const confirmDeleteArticle = (data) => {
            article.value = data;
            deleteArticleDialog.value = true;
        };

        const saveArticle = async () => {
            submitted.value = true;

            const formData = new FormData();

            if (!!imageLoad.value) formData.append("img_preview", imageLoad.value);
            formData.append("article", article.value?.article);
            formData.append("description", article.value?.description);

            if (Object.keys(article.value).length > 0 && article.value.article.trim()) {
                if (article.value.id) {
                    formData.append("_method", "PATCH");
                    await store.dispatch("article/update", { id: article.value.id, formData: formData });
                } else {
                    await store.dispatch("article/store", formData);
                }

                if (errors.value.length === 0) {
                    articleDialog.value = false;
                    article.value = {};
                }
            }
        };

        const deleteArticle = async () => {
            await store.dispatch("article/destroy", article.value.id);
            deleteArticleDialog.value = false;
            article.value = {};
        };

        const onRowSelect = () => {
            if (isEditor.value || isAdmin.value) {
                displayContentDialog.value = true;
            }
        };

        const inputEditor = () => {
            console.log(editor.value.getQuill());
        };

        const saveContent = (data) => {
            console.log(data);
        };

        const selectImgPreview = (event) => {
            isImgLoad.value = true;
            let reader = new FileReader();
            reader.onload = () => {
                article.value.tmp_preview = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            imageLoad.value = event.target.files[0];
        };

        const selectImgDelete = () => {
            isImgLoad.value = false;
            article.value.tmp_preview = "";
        };

        return {
            articles,
            article,
            loading,
            hideDialog,
            confirmDeleteArticle,
            deleteArticleDialog,
            deleteArticle,
            editArticle,
            submitted,
            articleDialog,
            saveArticle,
            openNew,
            errors,
            selectedArticle,
            onRowSelect,
            displayContentDialog,
            saveContent,
            selectImgPreview,
            selectImg,
            selectImgDelete,
            isImgLoad,
            inputEditor,
            editor,
            isEditor,
            isAuthor,
            isAdmin,
            published: async (id, published) => {
                const isPublished = published === 1 ? 0 : 1;

                const formData = new FormData();
                formData.append("is_publish", isPublished);
                formData.append("_method", "PATCH");

                await store.dispatch("article/update", { id: id, formData: formData });
            },
        };
    },
};
</script>

<style lang="scss">
#imgPreview:disabled ~ .input__file-button {
    background: #807e7e;
    cursor: default;
}

.product-image {
    width: 50px;
    height: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.product-image-select {
    width: 100px;
    height: 100px;
}
.input__wrapper {
    width: 100%;
    position: relative;
    margin: 15px 0;
    text-align: center;
}

.input__file {
    opacity: 0;
    visibility: hidden;
    position: absolute;
}

.input__file-button-text {
    line-height: 1;
    margin: 1px 10px;
}

.input__file-button {
    width: 100%;
    max-width: 290px;
    height: 45px;
    background: #1bbc9b;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 300 !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 auto;
}
</style>
