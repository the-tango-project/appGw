<template>
  <node-toolbar class="mb-5" :is-visible="isUserMustEdit" :position="mustEditToolbarPositionTop">
    <small v-if="isUserMustEdit" class="text-danger"
      ><em>{{ $t('appGwApp.process.state.messages.edit-state') }}</em></small
    >
  </node-toolbar>
  <div :class="{ 'text-danger': isUserMustEdit }" v-text="$t('archeApp.EstadoSolicitud.' + id)"></div>
  <div :class="{ hidden: !isHandleVisible }">
    <handle class="connector" id="connector-a" type="source" :position="leftEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-b" type="source" :position="leftEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-c" type="source" :position="leftEnum" :connectable="true"></handle>

    <handle class="connector" id="connector-d" type="source" :position="bottomEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-e" type="source" :position="bottomEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-f" type="source" :position="bottomEnum" :connectable="true"></handle>

    <handle class="connector" id="connector-g" type="source" :position="rightEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-h" type="source" :position="rightEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-i" type="source" :position="rightEnum" :connectable="true"></handle>

    <handle class="connector" id="connector-j" type="source" :position="topEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-k" type="source" :position="topEnum" :connectable="true"></handle>
    <handle class="connector" id="connector-l" type="source" :position="topEnum" :connectable="true"></handle>
  </div>
</template>

<script lang="ts" src="./node-state.component.ts"></script>
