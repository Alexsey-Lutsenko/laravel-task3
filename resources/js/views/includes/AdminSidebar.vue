<template>
    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <router-link :to="'/admin/category'" class="nav-link">
                        <i class="pi pi-bars"></i><p class="mx-2">Категории</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/admin/tags'" class="nav-link">
                        <i class="pi pi-hashtag"></i><p class="mx-2">Теги</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/admin/articles'" class="nav-link">
                        <i class="pi pi-th-large"></i><p class="mx-2">Статьи</p>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "AdminSidebar"
}
</script>

<style scoped>

</style>
