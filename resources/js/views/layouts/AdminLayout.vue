<template>
    <teleport to="body">
        <div class="wrapper">
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <div class="brand-link mx-3 d-flex">
                    <div class="logo">
                        <i class="pi pi-cog"></i>
                        <span class="brand-text font-weight-light mx-2">Admin</span>
                    </div>
                </div>
            <admin-sidebar></admin-sidebar>
            </aside>
        </div>
        <router-view></router-view>
    </teleport>
</template>

<script>
import AdminSidebar from "../includes/AdminSidebar";

export default {
    name: "AdminLayout",
    components: {AdminSidebar}
}
</script>

<style lang="scss" scoped>
.sidebar {
    min-height: 93.7vh;
    font-size: 16px;
}
.brand-link {
    justify-content: space-between;
}
.logo {
    cursor: default;
    color: #fff;

    &:hover {
        cursor: default;
        color: #fff;
    }
}
</style>
