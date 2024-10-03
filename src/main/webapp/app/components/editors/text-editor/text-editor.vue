<template>
  <quill-editor :ref="(el: any) => (editorRef = el)" v-model:content="text" :options="options"></quill-editor>
</template>

<script lang="ts" src="./text-editor.component.ts"></script>
