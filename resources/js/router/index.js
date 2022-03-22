import {createRouter, createWebHistory} from "vue-router"
import AdminPage from "../views/pages/AdminPage";
import NotFoundPage from "../views/pages/NotFoundPage";
import CategoryAdminComponent from "../components/AdminComponents/CategoryAdminComponent";
import TagsAdminComponent from "../components/AdminComponents/TagsAdminComponent";
import ArticlesAdminComponent from "../components/AdminComponents/ArticlesAdminComponent";

const routes = [
    {
        path: "/admin",
        name: AdminPage,
        component: AdminPage,
        redirect: '/admin/category',
        children: [
            {path: 'category', name: CategoryAdminComponent, component: CategoryAdminComponent},
            {path: 'tags', name: TagsAdminComponent, component: TagsAdminComponent},
            {path: 'articles', name: ArticlesAdminComponent, component: ArticlesAdminComponent},
        ],
        meta: {
            layout: "admin",
            auth: false,
            admin: false,
        }
    },
    {
        path: "/:notFound(.*)",
        name: NotFoundPage,
        component: NotFoundPage,
        meta: {
            layout: "main",
            auth: false,
            admin: false,
        },
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    next()
})

export default router;
