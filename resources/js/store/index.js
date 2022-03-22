import Vuex from "vuex"
import articleModule from "./modules/article.module";
import categoryModule from "./modules/category.module";
import tagModule from "./modules/tag.module";

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
    modules: {articleModule, categoryModule, tagModule}
})
