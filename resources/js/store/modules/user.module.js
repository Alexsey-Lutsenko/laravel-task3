import axios from "axios";
import store from "../index";
import errorHandler from "../../utils/errorHandler";

export default {
    namespaced: true,
    state() {
        return {
            users: [],
            userLogin: JSON.parse(localStorage.getItem("user")) ?? {},
            errors: [],
            errorCount: 0,
        };
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
        getUserLogin(state) {
            return state.userLogin;
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
        userLogin(state, payload) {
            state.userLogin = payload.data;
            console.log(payload.data);
            localStorage.setItem("user", JSON.stringify(payload.data));
        },
        userLogout() {
            localStorage.removeItem("user");
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

        async login({ commit }, paylaod) {
            try {
                const { data } = await axios.post("/api/users/login", paylaod);
                commit("userLogin", data);
                store.commit("setMessage", { text: data.data.message, type: "danger" }, { root: true });
                commit("remuveError");
            } catch (e) {
                commit("addErrors", errorHandler(e));
            }
        },
    },
};
