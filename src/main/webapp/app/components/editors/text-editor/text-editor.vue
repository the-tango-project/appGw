<template>
  <quill-editor :ref="(el: any) => (editorRef = el)" v-model:content="text" contentType="html" theme="snow"></quill-editor>
</template>

<script lang="ts" src="./text-editor.component.ts"></script>
