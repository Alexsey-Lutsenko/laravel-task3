<template>
    <div v-if="editor" class="d-flex">
        <button @click="editor.chain().focus().toggleBold().run()" class="btn btn-editor" :class="{ 'is-active': editor.isActive('bold') }">
            bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" class="btn btn-editor" :class="{ 'is-active': editor.isActive('italic') }">
            italic
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" class="btn btn-editor" :class="{ 'is-active': editor.isActive('strike') }">
            strike
        </button>
        <button @click="editor.chain().focus().toggleCode().run()" class="btn btn-editor" :class="{ 'is-active': editor.isActive('code') }">
            code
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
            h1
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
            h2
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
            h3
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
            h4
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
            h5
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
            h6
        </button>
        <button
            @click="editor.chain().focus().setTextAlign('left').run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
            <i class="pi pi-align-left px-1"></i>
        </button>
        <button
            @click="editor.chain().focus().setTextAlign('center').run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
            <i class="pi pi-align-center px-1"></i>
        </button>
        <button
            @click="editor.chain().focus().setTextAlign('right').run()"
            class="btn btn-editor"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
            <i class="pi pi-align-right px-1"></i>
        </button>

        <button @click="editor.chain().focus().toggleCodeBlock().run()" class="btn btn-editor" :class="{ 'is-active': editor.isActive('codeBlock') }">
            code block
        </button>
        <button @click="editor.chain().focus().undo().run()" class="btn btn-editor"><i class="pi pi-replay"></i></button>
        <button @click="editor.chain().focus().redo().run()" class="btn btn-editor"><i class="pi pi-refresh"></i></button>

        <button @click="$emit('addImage')" class="btn btn-editor"><i class="pi pi-image px-1"></i></button>
        <input type="file" class="download-image" @change="$emit('changeImage', $event)" style="display: none" />

        <div class="d-flex ml-auto">
            <div>
                <small v-if="changeSave" class="change-save px-2">{{ changeSave }}</small>
            </div>
            <button @click="$emit('getContent')" class="btn btn-save">Сохранить изменения</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        editor: {
            type: Object,
            default: null,
        },
        changeSave: {
            type: String,
        },
    },
    emits: ["addImage", "getContent", "changeImage"],
    setup() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.btn-editor {
    border: 1px solid #807e7e;
    background: #ffffff;
    margin-left: 2px;
    padding: 3px;
    &:focus {
        box-shadow: none;
    }
}
.is-active {
    background: #beb8b8;
}
.btn-save {
    border: 1px solid #2f9e5a;
    background: #86e693;
    margin-left: auto;
    padding: 3px;
    &:focus {
        box-shadow: none;
    }
}
.change-save {
    font-size: 12px;
    color: #27ad5b;
}
</style>
