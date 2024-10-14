<template>
  {{ x }}, {{ y }}
  <div style="height: 80vh">
    <vue-flow
      class="canvas-flow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      :nodes="nodes"
      :edges="edges"
      fit-view-on-init
      :apply-default="false"
      :default-zoom="1.5"
    >
      <template #node-state="props">
        <node-state :id="props.id" :data="props.data" />
      </template>

      <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
        <connection-line :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
      </template>

      <background></background>
      <mini-map pannable zoomable nodeColor="#90afce" nodeStrokeColor="#90afce" maskColor="rgb(216, 234, 243, 0.7)"></mini-map>
      <control-buttons></control-buttons>
    </vue-flow>
    <core-confirmation-modal ref="removeElementModal" variant="danger" @confirmed="confirmedHandler" @canceled="canceledHandler">
      <b-table striped hover :items="nodeToRemove"></b-table>
      <b-table striped hover :items="edgeToRemove"></b-table>
    </core-confirmation-modal>
  </div>
</template>

<script lang="ts" src="./flow.component.ts"></script>
