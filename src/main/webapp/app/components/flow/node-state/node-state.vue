<template>
  <node-toolbar class="mb-5" :is-visible="data?.toolbarVisible" :position="toolbarPosition">
    <b-button variant="light" class="p-0" size="lg" @click="addNodeHandler">
      <b-icon icon="plus-square" font-scale="1"></b-icon>
    </b-button>
  </node-toolbar>
  <div v-text="$t('archeApp.EstadoSolicitud.' + id)"></div>
  <handle id="source" type="source" :position="rightEnum" :connectable="true"></handle>
  <handle class="connector" id="target-a" type="target" :position="leftEnum" :connectable="true"></handle>
  <handle class="connector" id="target-b" type="target" :position="leftEnum" :connectable="true"></handle>
</template>

<script lang="ts" src="./node-state.component.ts"></script>
