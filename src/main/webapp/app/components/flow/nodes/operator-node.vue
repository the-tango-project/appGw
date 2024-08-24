<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';

const props = defineProps(['id', 'data']);

const operators = ['+', '-', '*', '/'];

const actions = ['👎', '✋', '👍'];
const { updateNodeData } = useVueFlow();
</script>

<template>
  <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <button
      v-for="action of actions"
      :key="action"
      type="button"
      :class="{ selected: action === data.action }"
      @click="updateNodeData(props.id, { action })"
    >
      {{ action }}
    </button>
  </NodeToolbar>
  <div>
    <div class="buttons">
      {{ props.id }}
    </div>
  </div>

  <Handle type="source" :position="Position.Right" :connectable="true" />
  <Handle id="target-a" type="target" :position="Position.Left" :connectable="true" />
  <Handle id="target-b" type="target" :position="Position.Left" :connectable="true" />
</template>
