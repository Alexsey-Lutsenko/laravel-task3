import { createRouter, createWebHistory } from "vue-router";
import AdminPage from "../views/pages/AdminPage";
import MainPage from "../views/pages/MainPage";
import ArticlePage from "../views/pages/ArticlePage";
import ArticleContentPage from "../views/pages/ArticleContentPage";
import LoginPage from "../views/pages/LoginPage";
import StatisticPage from "../views/pages/StatisticPage";
import NotFoundPage from "../views/pages/NotFoundPage";
import CategoryAdminComponent from "../components/AdminComponents/CategoryAdminComponent";
import TagsAdminComponent from "../components/AdminComponents/TagsAdminComponent";
import ArticlesAdminComponent from "../components/AdminComponents/ArticlesAdminComponent";

const routes = [
    {
        path: "/login",
        name: LoginPage,
        component: LoginPage,
        meta: {
            layout: "login",
            auth: false,
            admin: false,
        },
    },
    {
        path: "/",
        name: MainPage,
        component: MainPage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
    {
        path: "/article",
        name: ArticlePage,
        component: ArticlePage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
    {
        path: "/statistic",
        name: StatisticPage,
        component: StatisticPage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
            chiesEditor: true,
        },
    },
    {
        path: "/admin",
        name: AdminPage,
        component: AdminPage,
        redirect: "/admin/articles",
        children: [
            { path: "category", name: CategoryAdminComponent, component: CategoryAdminComponent },
            { path: "tags", name: TagsAdminComponent, component: TagsAdminComponent },
            { path: "articles", name: ArticlesAdminComponent, component: ArticlesAdminComponent },
        ],
        meta: {
            layout: "admin",
            auth: true,
            admin: true,
        },
    },
    {
        path: "/article/:id",
        name: ArticleContentPage,
        component: ArticleContentPage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
    {
        path: "/:notFound(.*)",
        name: NotFoundPage,
        component: NotFoundPage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: "active",
    linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth;
    const requireAdmin = to.meta.admin;
    const requireCiefEditor = to.meta.chiesEditor;
    const login = !!localStorage.getItem("user");
    const isAdmin = JSON.parse(localStorage.getItem("user"))?.permissions.length > 0 ? true : false;
    const isChiefEditor = _.includes(JSON.parse(localStorage.getItem("user"))?.permissions, 6) ? true : false;

    if (requireAuth && !login) {
        next("/login?message=auth");
    } else if (!isChiefEditor && requireCiefEditor) {
        next("/");
    } else if (!isAdmin && requireAdmin) {
        next("/");
    } else if (!requireAuth && login) {
        next("/");
    } else if (requireAuth && login) {
        next();
    } else {
        next();
    }
});

export default router;
