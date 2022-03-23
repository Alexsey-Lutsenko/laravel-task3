<template>
    <div class="d-flex flex-column align-items-center">
        <h1>Управление статьями</h1>

        <div class="my-5 w-75">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Добавить" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable :value="articles" dataKey="id" :loading="loading" :resizableColumns="true" columnResizeMode="fit"
                       v-model:selection="selectedArticle" selectionMode="single" @rowSelect="onRowSelect"
                       class="p-datatable-sm" editMode="row" :scrollable="true" scrollHeight="400px">
                <Column field="id" header="id" :sortable="true" style="max-width:5rem; padding-left: 10px"></Column>
                <Column header="Превью" style="max-width:8rem">
                    <template #body="slotProps">
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="product-image" />
                    </template>
                </Column>
                <Column field="article" header="Статья"></Column>
                <Column field="description" header="Описание"></Column>
                <Column :exportable="false" style="max-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editArticle(slotProps.data)"/>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteArticle(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="articleDialog" :style="{width: '450px'}" header="Управление Категориями" :modal="true" class="p-fluid">
            <div class="field">
                <label for="imgPreview">Превью</label>
                <FileUpload id="imgPreview" mode="basic" name="demo[]" accept="image/*" :customUpload="true"
                            :maxFileSize="1000000" :fileLimit="1" @select="selectImgPreview"/>
                <small class="p-error" v-if="submitted && (!article.img_preview || errors.img_preview)">{{ errors.img_preview ?? 'Название не может быть пустым' }}</small>
            </div>
            <div class="field">
                <label for="article">Статья</label>
                <InputText id="article" v-model.trim="article.article" required="true"
                           :class="{'p-invalid': submitted && (!article.article || errors.article)}" />
                <small class="p-error" v-if="submitted && (!article.article || errors.article)">{{ errors.article ?? 'Название не может быть пустым' }}</small>
            </div>
            <div class="field">
                <label for="description">Описание</label>
                <InputText id="description" v-model.trim="article.description" required="true"
                           :class="{'p-invalid': submitted && (!article.description || errors.description)}" />
                <small class="p-error" v-if="submitted && (!article.description || errors.description)">{{ errors.description ?? 'Название не может быть пустым' }}</small>
            </div>
            <template #footer>
                <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveArticle" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteArticleDialog" :style="{width: '450px'}" header="Внимание" :modal="true">
            <div class="confirmation-content d-flex align-items-center">
                <i class="pi pi-exclamation-triangle mx-2" style="font-size: 2rem" />
                <span v-if="article">Вы точно хотите удалить <b>{{ article.article }}</b>?</span>
            </div>
            <template #footer>
                <Button label="Нет" icon="pi pi-times" class="p-button-text" @click="deleteArticleDialog = false"/>
                <Button label="Да" icon="pi pi-check" class="p-button-text" @click="deleteArticle" />
            </template>
        </Dialog>

        <Dialog v-if="selectedArticle.article" :header="`Редактирование контента статьи ${ selectedArticle.article ?? '' }`" v-model:visible="displayContentDialog"
                :style="{width: '50vw'}" :maximizable="true" :modal="true">
            <editor v-model="selectedArticle.content" editorStyle="height: 320px" />
            <template #footer>
                <Button label="Отмена" icon="pi pi-times" @click="displayContentDialog = false" class="p-button-text"/>
                <Button label="Сохранить" icon="pi pi-check" @click="saveContent" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script>
import {ref, computed, onMounted, watch} from "vue";
import {useStore} from "vuex"

export default {
    name: "ArticleAdminComponent",
    setup() {
        const store = useStore();
        const submitted = ref(false);
        const articleDialog = ref(false);
        const deleteArticleDialog = ref(false);
        const displayContentDialog = ref(false)
        const article = ref({})
        const selectedArticle = ref({});

        const articles = computed(() => store.getters["article/getArticles"])
        const errors = computed(() => store.getters["article/getErrors"])
        const loading = computed(() => store.getters["getLoader"])
        watch(loading, () => {});

        onMounted(async() => {
            await store.dispatch("article/index")
        })

        const openNew = () => {
            article.value = {};
            submitted.value = false;
            articleDialog.value = true;
        };

        const hideDialog = () => {
            articleDialog.value = false;
            submitted.value = false;
        };

        const editArticle = (data) => {
            article.value = data;
            articleDialog.value = true;
        };

        const confirmDeleteArticle = (data) => {
            article.value = data;
            deleteArticleDialog.value = true;
        };

        const saveArticle = async () => {
            submitted.value = true;
            if (Object.keys(article.value).length > 0 && article.value.article.trim()) {
                if (article.value.id) {
                    console.log(article.value)
                    // await store.dispatch("article/update", article.value)
                }
                else {
                    console.log(article.value)
                    // await store.dispatch("article/store", article.value)
                }

                if(errors.value.length === 0) {
                    articleDialog.value = false;
                    article.value = {};
                }
            }
        };

        const deleteArticle = () => {
            store.dispatch("article/destroy", article.value.id)
            deleteArticleDialog.value = false;
            article.value = {};
        };

        const onRowSelect = () => {
            displayContentDialog.value = true;
        }

        const saveContent = () => {
            console.log(selectedArticle.value)
            displayContentDialog.value = false;
        }

        const selectImgPreview = (event) => {
            console.log(event.files)
        }

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
            selectImgPreview
        }
    },
}
</script>

<style scoped>
.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
