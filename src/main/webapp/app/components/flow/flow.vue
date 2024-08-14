<template>
  <div>
    <div style="height: 50rem">
      <vue-flow
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
        :nodes="nodes"
        :edges="edges"
        :class="{ dark }"
      >
        <background></background>
        <panel>
          <button type="button">Add a node</button>
          <button type="button">Add multiple nodes</button>
        </panel>
      </vue-flow>
    </div>
  </div>
</template>

<script lang="ts" src="./flow.component.ts"></script>
<style lang="scss" scoped>
.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.basic-flow.dark {
  background: #2d3748;
  color: #fffffb;
}

.basic-flow.dark .vue-flow__node {
  background: #4a5568;
  color: #fffffb;
}

.basic-flow.dark .vue-flow__node.selected {
  background: #333;
  box-shadow: 0 0 0 2px #2563eb;
}

.basic-flow .vue-flow__controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.basic-flow.dark .vue-flow__controls {
  border: 1px solid #fffffb;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button {
  border: none;
  border-right: 1px solid #eee;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button svg {
  height: 100%;
  width: 100%;
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button {
  background: #333;
  fill: #fffffb;
  border: none;
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button:hover {
  background: #4d4d4d;
}

.basic-flow.dark .vue-flow__edge-textbg {
  fill: #292524;
}

.basic-flow.dark .vue-flow__edge-text {
  fill: #fffffb;
}
</style>
