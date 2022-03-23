<template>
    <div class="d-flex flex-column align-items-center">
        <h1>Управление категориями</h1>

        <div class="my-5 w-50">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Добавить" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </template>
            </Toolbar>


            <DataTable :value="categories" dataKey="id" :loading="loading" :resizableColumns="true" columnResizeMode="fit"
                       class="p-datatable-sm" editMode="row" showGridlines :scrollable="true" scrollHeight="400px">
                <Column field="id" header="id" :sortable="true" style="max-width:5rem; padding-left: 10px"></Column>
                <Column field="category" header="Категория"></Column>
                <Column :exportable="false" style="max-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editCategory(slotProps.data)"/>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteCategory(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="categoryDialog" :style="{width: '450px'}" header="Управление Категориями" :modal="true" class="p-fluid">
            <div class="field">
                <label for="category">Категория</label>
                <InputText id="category" v-model.trim="category.category" required="true" autofocus :class="{'p-invalid': submitted && (!category.category || errors.category)}" />
                <small class="p-error" v-if="submitted && (!category.category || errors.category)">{{ errors.category ?? 'Название не может быть пустым' }}</small>
            </div>
            <template #footer>
                <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveCategory" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteCategoryDialog" :style="{width: '450px'}" header="Внимание" :modal="true">
            <div class="confirmation-content d-flex align-items-center">
                <i class="pi pi-exclamation-triangle mx-2" style="font-size: 2rem" />
                <span v-if="category">Вы точно хотите удалить <b>{{ category.category }}</b>?</span>
            </div>
            <template #footer>
                <Button label="Нет" icon="pi pi-times" class="p-button-text" @click="deleteCategoryDialog = false"/>
                <Button label="Да" icon="pi pi-check" class="p-button-text" @click="deleteCategory" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import {ref, computed, onMounted, watch} from "vue";
import {useStore} from "vuex"

export default {
    name: "CategoryAdminComponent",
    setup() {
        const store = useStore();
        const submitted = ref(false);
        const categoryDialog = ref(false);
        const deleteCategoryDialog = ref(false);
        const category = ref({})

        const categories = computed(() => store.getters["category/getCategories"])
        const errors = computed(() => store.getters["category/getErrors"])
        const loading = computed(() => store.getters["getLoader"])
        watch(loading, () => {});

        onMounted(async() => {
            await store.dispatch("category/index")
        })

        const openNew = () => {
            category.value = {};
            submitted.value = false;
            categoryDialog.value = true;
        };

        const hideDialog = () => {
            categoryDialog.value = false;
            submitted.value = false;
        };

        const editCategory = (data) => {
            category.value = data;
            categoryDialog.value = true;
        };

        const confirmDeleteCategory = (data) => {
            category.value = data;
            deleteCategoryDialog.value = true;
        };

        const saveCategory = async () => {
            submitted.value = true;
            if (Object.keys(category.value).length > 0 && category.value.category.trim()) {
                if (category.value.id) {
                    await store.dispatch("category/update", category.value)
                }
                else {
                    await store.dispatch("category/store", category.value)
                }

                if(errors.value.length === 0) {
                    categoryDialog.value = false;
                    category.value = {};
                }
            }
        };

        const deleteCategory = () => {
            store.dispatch("category/destroy", category.value.id)
            deleteCategoryDialog.value = false;
            category.value = {};
        };

        return {
            categories,
            category,
            loading,
            hideDialog,
            confirmDeleteCategory,
            deleteCategoryDialog,
            deleteCategory,
            editCategory,
            submitted,
            categoryDialog,
            saveCategory,
            openNew,
            errors
        }
    }
}
</script>

<style scoped>

</style>
