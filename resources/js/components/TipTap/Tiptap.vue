<template>
    <div class="editor">
        <editor-buttons :editor="editor" :changeSave="change" @addImage="addImage" @getContent="saveContentEditor" @changeImage="changeImage" />

        <editor-content :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import EditorButtons from "./EditorButtons";

import { useStore } from "vuex";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

export default {
    props: {
        article: {
            type: Object,
        },
    },

    components: {
        EditorContent,
        EditorButtons,
    },

    setup(props, { emit }) {
        const store = useStore();
        const editor = ref(null);
        const change = ref("");
        const imgContentArray = ref([]);

        const imageUrl = computed(() => store.getters["image/getImage"]);

        onMounted(() => {
            editor.value = new Editor({
                content: props.article.content,
                extensions: [
                    StarterKit,
                    Image,
                    TextAlign.configure({
                        types: ["heading", "paragraph"],
                    }),
                ],
            });
        });

        onBeforeUnmount(() => {
            editor.value.destroy();
        });

        return {
            editor,
            change,
            addImage: () => {
                let Image = document.querySelector(".download-image");
                Image.click();
            },
            changeImage: async (input) => {
                let file = input.target.files[0];

                const data = new FormData();
                data.append("image", file);
                data.append("article_id", props.article.id);

                await store.dispatch("image/store", data);
                file = {};
                if (imageUrl.value) {
                    editor.value.chain().focus().setImage({ src: imageUrl.value }).run();
                }
            },
            saveContentEditor: async () => {
                let images = document.querySelectorAll(".ProseMirror img");
                images.forEach((image) => {
                    imgContentArray.value.push(image.currentSrc.slice(image.currentSrc.search("images")));
                });

                const data = new FormData();
                const content = editor.value.getHTML();

                data.append("content", content);
                imgContentArray.value.forEach((image) => {
                    data.append("img_content_array[]", image);
                });
                data.append("_method", "PATCH");

                await store.dispatch("article/update", { id: props.article.id, formData: data });

                imgContentArray.value = [];
                change.value = "Изменения сохранены";

                setTimeout(() => {
                    change.value = "";
                }, 2000);
            },
        };
    },
};
</script>
<style lang="scss">
/* Basic editor styles */
.ProseMirror {
    > * + * {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0d0d0d;
        color: #fff;
        font-family: "JetBrainsMono", monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0d0d0d, 0.1);
        margin: 2rem 0;
    }
}

.ProseMirror {
    margin-top: 1em;
    min-height: 400px;
    padding: 1em;
    border: 1px solid #beb8b8;
    border-radius: 3px;
}
.ProseMirror-focused:focus-visible {
    outline: none;
}
</style>
