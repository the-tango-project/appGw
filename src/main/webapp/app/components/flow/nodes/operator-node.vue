<template>
  <node-toolbar class="mb-5" :is-visible="data.toolbarVisible" :position="toolbarPosition">
    <b-button variant="light" class="p-0" size="lg" @click="deleteNodeHandler">
      <b-icon icon="trash" font-scale="1"></b-icon>
    </b-button>
    <b-button variant="light" class="p-0" size="lg" @click="deleteNodeHandler">
      <b-icon icon="plus-square" font-scale="1"></b-icon>
    </b-button>
  </node-toolbar>
  <div v-if="data.edit"><core-select-one :options="['this', 'is', 'excelent']"></core-select-one></div>
  <div v-else>
    {{ id }}
  </div>
  <handle type="source" :position="rightEnum" :connectable="true"></handle>
  <handle id="target-a" type="target" :position="leftEnum" :connectable="true"></handle>
  <handle id="target-b" type="target" :position="leftEnum" :connectable="true"></handle>
</template>

<script lang="ts" src="./operator-node.component.ts"></script>
