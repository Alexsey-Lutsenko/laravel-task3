import axios from "axios";
import store from "../index";
import errorHandler from "../../utils/errorHandler";

export default {
    namespaced: true,
    state() {
        return {
            image: [],
            errors: [],
            errorCount: 0,
        };
    },
    getters: {
        getImage(state) {
            return state.image;
        },
        getErrors(state) {
            return state.errors;
        },
        getErrorCount(state) {
            return state.errorCount;
        },
    },
    mutations: {
        addImage(state, payload) {
            state.image = payload;
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
        // async index({ commit }) {
        //     try {
        //         store.commit("addLoader", { root: true });
        //         const { data } = await axios.get("/api/article/image");
        //         commit("addImage", data.data);
        //         commit("remuveError");
        //     } catch (e) {
        //         commit("addErrors", errorHandler(e));
        //     } finally {
        //         store.commit("removeLoader", { root: true });
        //     }
        // },

        async store({ commit, dispatch }, payload) {
            try {
                await axios.post("/api/articles/images", payload).then((res) => {
                    commit("addImage", res.data.url);
                });
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },

        // async destroy({ commit, dispatch }, id) {
        //     try {
        //         await axios.delete(`/api/article/image/${id}`);
        //         await dispatch("index");
        //         commit("remuveError");
        //     } catch (e) {
        //         commit("addErrors", errorHandler(e));
        //     }
        // },
    },
};
