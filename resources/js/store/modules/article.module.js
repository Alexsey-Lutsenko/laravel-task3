import axios from "axios";
import store from "../index";
import errorHandler from "../../utils/errorHandler";

export default {
    namespaced: true,
    state() {
        return {
            articles: [],
            article: {},
            errors: [],
            errorCount: 0,
        };
    },
    getters: {
        getArticles(state) {
            return state.articles;
        },
        getArticle(state) {
            return state.article;
        },
        getErrors(state) {
            return state.errors;
        },
        getErrorCount(state) {
            return state.errorCount;
        },
    },
    mutations: {
        addArticles(state, payload) {
            state.articles = payload;
        },
        addArticle(state, payload) {
            state.article = payload;
        },
        addErrors(state, requests) {
            if (requests.message) {
                console.error("Error: " + requests.message);
            }

            if (requests.errors) {
                state.errorCount = 1;
            }
            state.errors = requests.errors;
        },
        remuveError(state) {
            state.errorCount = 0;
            state.errors = [];
        },
    },
    actions: {
        async index({ commit }, payload) {
            try {
                store.commit("addLoader", { root: true });
                await axios.get("/api/articles", { params: payload }).then((res) => {
                    commit("addArticles", res?.data?.data);
                    if (payload) {
                        commit("addArticle", res?.data?.data[0]);
                    }
                });
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            } finally {
                store.commit("removeLoader", { root: true });
            }
        },

        async store({ commit, dispatch }, payload) {
            try {
                await axios.post("/api/articles", payload);
                await dispatch("index");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },

        async update({ commit, dispatch }, payload) {
            try {
                await axios.post(`/api/articles/${payload.id}`, payload.formData);
                await dispatch("index");
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },

        async destroy({ commit, dispatch }, id) {
            try {
                await axios.delete(`/api/articles/${id}`);
                await dispatch("index");
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },
    },
};
