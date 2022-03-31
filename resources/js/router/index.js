import { createRouter, createWebHistory } from "vue-router";
import AdminPage from "../views/pages/AdminPage";
import MainPage from "../views/pages/MainPage";
import ArticlePage from "../views/pages/ArticlePage";
import ArticleContentPage from "../views/pages/ArticleContentPage";
import LoginPage from "../views/pages/LoginPage";
import RegistrationPage from "../views/pages/RegistrationPage";
import StatisticPage from "../views/pages/StatisticPage";
import NotFoundPage from "../views/pages/NotFoundPage";
import CategoryAdminComponent from "../components/AdminComponents/CategoryAdminComponent";
import TagsAdminComponent from "../components/AdminComponents/TagsAdminComponent";
import ArticlesAdminComponent from "../components/AdminComponents/ArticlesAdminComponent";

const routes = [
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
        meta: {
            layout: "login",
            auth: false,
            admin: false,
        },
    },
    {
        path: "/registration",
        name: "RegistrationPage",
        component: RegistrationPage,
        meta: {
            layout: "login",
            auth: false,
            admin: false,
        },
    },
    {
        path: "/",
        name: "MainPage",
        component: MainPage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
    {
        path: "/article",
        name: "ArticlePage",
        component: ArticlePage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
    {
        path: "/statistic",
        name: "StatisticPage",
        component: StatisticPage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
    {
        path: "/admin",
        name: "AdminPage",
        component: AdminPage,
        redirect: "/admin/articles",
        children: [
            { path: "category", name: "CategoryAdminComponent", component: CategoryAdminComponent },
            { path: "tags", name: "TagsAdminComponent", component: TagsAdminComponent },
            { path: "articles", name: "ArticlesAdminComponent", component: ArticlesAdminComponent },
        ],
        meta: {
            layout: "admin",
            auth: true,
            admin: true,
        },
    },
    {
        path: "/article/:id",
        name: "ArticleContentPage",
        component: ArticleContentPage,
        meta: {
            layout: "main",
            auth: true,
            admin: false,
        },
    },
    {
        path: "/:notFound(.*)",
        name: "NotFoundPage",
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
    const token = localStorage.getItem("x_xsrf_token");
    const permissions = localStorage.getItem("permissions");
    const requireAuth = to.meta.auth;
    const requireAdmin = to.meta.admin;
    let isAdmin = false;
    let isChiefEditor = false;

    if (!!permissions) {
        isAdmin = permissions?.length > 0 ? true : false;
        isChiefEditor = _.includes(permissions, 6) ? true : false;
    }

    if (!token) {
        if (!requireAuth) {
            return next();
        } else {
            return next({ name: "LoginPage" });
        }
    }

    if (token) {
        if (!requireAuth) {
            return next({ name: "MainPage" });
        } else if (to.name === "StatisticPage" && isChiefEditor) {
            return next();
        } else if (requireAdmin && isAdmin) {
            return next();
        } else {
            return next();
        }
    }

    next();
});

export default router;
