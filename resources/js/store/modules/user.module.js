import axios from "axios";
import store from "../index";
import router from "../../router";
import errorHandler from "../../utils/errorHandler";

export default {
    namespaced: true,
    state() {
        return {
            users: [],
            userPermissions: localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : {},
            errors: [],
            errorCount: 0,
        };
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
        getUserPermissions(state) {
            return state.userPermissions;
        },
        getErrors(state) {
            return state.errors;
        },
        getErrorCount(state) {
            return state.errorCount;
        },
    },
    mutations: {
        addUsers(state, payload) {
            state.users = payload;
        },
        userPermissions(state, payload) {
            state.userPermissions = payload;
            localStorage.setItem("permissions", JSON.stringify(payload));
        },
        addErrors(state, requests) {
            if (requests?.message) {
                console.error("Error: " + requests.message);
            }

            if (requests?.errors) {
                state.errorCount = 1;
                state.errors = requests.errors;
            }
        },
        remuveError(state) {
            state.errorCount = 0;
            state.errors = [];
        },
    },
    actions: {
        async index({ commit }) {
            try {
                store.commit("addLoader", { root: true });
                const { data } = await axios.get("/api/users");
                commit("addUsers", data.data);
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            } finally {
                store.commit("removeLoader", { root: true });
            }
        },

        async loginUser({ commit }, payload) {
            await axios
                .post("/api/users", payload)
                .then((res) => {
                    commit("userPermissions", res.data.data.permissions);
                    commit("remuveError");
                })
                .catch((e) => {
                    commit("addErrors", errorHandler(e));
                });
        },

        async email({ commit }, payload) {
            await axios
                .post("/email/verify")
                .then((res) => {})
                .catch((e) => {
                    commit("addErrors", errorHandler(e));
                });
        },

        async login({ commit, dispatch, getters }, payload) {
            try {
                await dispatch("loginUser", payload);
                const user = getters["getUserPermissions"];

                if (Array.isArray(user)) {
                    await axios.get("/sanctum/csrf-cookie").then((response) => {
                        axios
                            .post("/login", payload)
                            .then((res) => {
                                localStorage.setItem("x_xsrf_token", res.config.headers["X-XSRF-TOKEN"]);
                                router.push("/");
                                commit("remuveError");
                            })
                            .catch((e) => {
                                commit("addErrors", errorHandler(e));
                            });
                    });
                }
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },

        async register({ commit }, payload) {
            try {
                localStorage.setItem("permissions", "[ ]");

                await axios.get("/sanctum/csrf-cookie").then((response) => {
                    axios
                        .post("/register", payload)
                        .then((res) => {
                            localStorage.setItem("x_xsrf_token", res.config.headers["X-XSRF-TOKEN"]);
                            router.push("/");
                            commit("remuveError");
                        })
                        .catch((e) => {
                            commit("addErrors", errorHandler(e));
                        });
                });
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },

        async logout({ commit }) {
            await axios
                .post("/logout")
                .then((res) => {
                    localStorage.removeItem("x_xsrf_token");
                    localStorage.removeItem("permissions");
                    commit("userPermissions", {});
                    router.push("/login");
                })
                .catch((e) => {
                    commit("addErrors", errorHandler(e));
                });
        },
    },
};
