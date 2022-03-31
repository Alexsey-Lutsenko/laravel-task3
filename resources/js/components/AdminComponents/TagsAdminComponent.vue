<template>
    <div class="d-flex flex-column align-items-center">
        <h1>Управление тегами</h1>

        <div class="my-5 w-50">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Добавить" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable
                :value="tags"
                dataKey="id"
                :loading="loading"
                :resizableColumns="true"
                columnResizeMode="fit"
                class="p-datatable-sm"
                editMode="row"
                showGridlines
                :scrollable="true"
                scrollHeight="400px"
            >
                <Column field="id" header="id" :sortable="true" style="max-width: 5rem; padding-left: 10px"></Column>
                <Column field="tag" header="Тег"></Column>
                <Column :exportable="false" style="max-width: 8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editTag(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteTag(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="tagDialog" :style="{ width: '450px' }" header="Управление Тегами" :modal="true" class="p-fluid">
            <div class="field">
                <label for="tag">Тег</label>
                <InputText
                    id="tag"
                    v-model.trim="tag.tag"
                    required="true"
                    autofocus
                    :class="{ 'p-invalid': submitted && (!tag.tag || errors.tag) }"
                />
                <small class="p-error" v-if="submitted && (!tag.tag || errors.tag)">{{ errors.tag ?? "Название не может быть пустым" }}</small>
            </div>
            <template #footer>
                <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveTag" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteTagDialog" :style="{ width: '450px' }" header="Внимание" :modal="true">
            <div class="confirmation-content d-flex align-items-center">
                <i class="pi pi-exclamation-triangle mx-2" style="font-size: 2rem" />
                <span v-if="tag"
                    >Вы точно хотите удалить <b>{{ tag.tag }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="Нет" icon="pi pi-times" class="p-button-text" @click="deleteTagDialog = false" />
                <Button label="Да" icon="pi pi-check" class="p-button-text" @click="deleteTag" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
    name: "TagAdminComponent",
    setup() {
        const store = useStore();
        const submitted = ref(false);
        const tagDialog = ref(false);
        const deleteTagDialog = ref(false);
        const tag = ref({});

        const tags = computed(() => store.getters["tag/getTags"]);
        const errors = computed(() => store.getters["tag/getErrors"]);
        const loading = computed(() => store.getters["getLoader"]);
        watch(loading, () => {});

        onMounted(async () => {
            await store.dispatch("tag/index");
        });

        const openNew = () => {
            tag.value = {};
            submitted.value = false;
            tagDialog.value = true;
        };

        const hideDialog = () => {
            tagDialog.value = false;
            submitted.value = false;
        };

        const editTag = (data) => {
            tag.value = data;
            tagDialog.value = true;
        };

        const confirmDeleteTag = (data) => {
            tag.value = data;
            deleteTagDialog.value = true;
        };

        const saveTag = async () => {
            submitted.value = true;
            if (Object.keys(tag.value).length > 0 && tag.value.tag.trim()) {
                if (tag.value.id) {
                    await store.dispatch("tag/update", tag.value);
                } else {
                    await store.dispatch("tag/store", tag.value);
                }

                if (errors.value.length === 0) {
                    tagDialog.value = false;
                    tag.value = {};
                }
            }
        };

        const deleteTag = () => {
            store.dispatch("tag/destroy", tag.value.id);
            deleteTagDialog.value = false;
            tag.value = {};
        };

        return {
            tags,
            tag,
            loading,
            hideDialog,
            confirmDeleteTag,
            deleteTagDialog,
            deleteTag,
            editTag,
            submitted,
            tagDialog,
            saveTag,
            openNew,
            errors,
        };
    },
};
</script>

<style scoped></style>
