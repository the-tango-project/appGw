<template>
  <div>
    <code-mirror v-model:value="code" :options="cmOptions" ref="cmRef" height="400" @change="onChange" @input="onInput" @ready="onReady">
    </code-mirror>
  </div>
</template>

<script lang="ts" src="./code-editor.component.ts"></script>
