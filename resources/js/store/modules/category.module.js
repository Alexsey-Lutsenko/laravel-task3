import axios from "axios";
import store from "../index";
import errorHandler from "../../utils/errorHandler";

export default {
    namespaced: true,
    state() {
        return {
            categories: [],
            errors: [],
            errorCount: 0
        }
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        getErrors(state) {
            return state.errors;
        },
        getErrorCount(state) {
            return state.errorCount;
        }
    },
    mutations: {
        addCategories(state, payload) {
            state.categories = payload;
        },
        addErrors(state, requests) {
            if(requests.message) {
                console.error('Error: ' + requests.message)
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
        async index({ commit }) {
            try {
                store.commit("addLoader", { root: true });
                const { data } = await axios.get("/api/categories");
                commit("addCategories", data.data);
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            } finally {
                store.commit("removeLoader", { root: true });
            }
        },

        async store({ commit, dispatch }, payload) {
            try {
                await axios.post("/api/categories", payload);
                await dispatch("index");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },

        async update({ commit, dispatch }, payload) {
            try {
                await axios.patch(`/api/categories/${payload.id}`, payload);
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },

        async destroy({ commit, dispatch }, id) {
            try {
                await axios.delete(`/api/categories/${id}`);
                await dispatch("index");
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        }
    }
}
