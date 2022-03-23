import Vuex from "vuex"
import article from "./modules/article.module";
import category from "./modules/category.module";
import tag from "./modules/tag.module";

export default new Vuex.Store({
    state() {
        return {
            loader: false,
        };
    },
    getters: {
        getLoader(state) {
            return state.loader;
        },
    },
    mutations: {
        addLoader(state) {
            state.loader = true;
        },
        removeLoader(state) {
            state.loader = false;
        },
    },
    modules: {article, category, tag}
})
