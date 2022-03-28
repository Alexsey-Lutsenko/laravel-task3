import Vuex from "vuex";
import article from "./modules/article.module";
import category from "./modules/category.module";
import tag from "./modules/tag.module";
import image from "./modules/image.module";
import user from "./modules/user.module";

export default new Vuex.Store({
    state() {
        return {
            loader: false,
            message: {
                text: "",
                type: "",
            },
        };
    },
    getters: {
        getLoader(state) {
            return state.loader;
        },
        getMessage(state) {
            return state.message;
        },
    },
    mutations: {
        addLoader(state) {
            state.loader = true;
        },
        removeLoader(state) {
            state.loader = false;
        },
        setMessage(state, payload) {
            state.message = payload;
        },
    },
    modules: { article, category, tag, image, user },
});
