<template>
  <div>
    {{ edges }}
    <div style="height: 100vh">
      <vue-flow
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
        :nodes="nodes"
        :edges="edges"
        :class="{ dark }"
        fit-view-on-init
        :apply-default="false"
        :default-zoom="1.5"
      >
        <background></background>
        <controls
          :showZoom="false"
          :showFitView="false"
          :showInteractive="false"
          position="top-left"
          @zoom-in.stop.prevent="zoomInHandler"
          @zoom-out="zoomInHandler"
        >
          <control-button>
            <b-button class="p-0" size="sm" variant="light" @click="zoomInHandler">
              <b-icon :class="{ 'disabled-option': isMaxZoom }" icon="plus-lg"></b-icon>
            </b-button>
          </control-button>
          <control-button>
            <b-button class="p-0" size="sm" variant="light" @click="zoomOutHandler">
              <b-icon :class="{ 'disabled-option': isMinZoom }" icon="dash-lg"></b-icon>
            </b-button>
          </control-button>
          <control-button>
            <b-button class="p-0" size="sm" variant="light" @click="fitViewHandler">
              <b-icon icon="fullscreen"></b-icon>
            </b-button>
          </control-button>
          <control-button>
            <b-button class="p-0" size="sm" variant="light" @click="lockAndUnlockHandler">
              <b-icon v-if="isLock" icon="lock-fill"></b-icon>
              <b-icon v-else icon="unlock-fill"></b-icon>
            </b-button>
          </control-button>
        </controls>
      </vue-flow>
      <core-confirmation-modal ref="removeElementModal" @confirmed="confirmedHandler" @canceled="canceledHandler" />
    </div>
  </div>
</template>

<script lang="ts" src="./flow.component.ts"></script>
<style lang="scss" scoped>
.disabled-option {
  color: #aba3b8;
}
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
