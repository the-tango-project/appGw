<template>
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
        <state-node :id="props.id" :data="props.data" />
      </template>

      <background></background>
      <mini-map pannable zoomable nodeColor="#90afce" nodeStrokeColor="#90afce" maskColor="rgb(216, 234, 243, 0.7)"></mini-map>
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
        <control-button>
          <b-button class="p-0" size="sm" variant="light" @click="lockAndUnlockHandler">
            <b-icon icon="person-bounding-box"></b-icon>
          </b-button>
        </control-button>
        <control-button>
          <b-button class="p-0" size="sm" variant="light" @click="lockAndUnlockHandler">
            <b-icon icon="people-fill"></b-icon>
          </b-button>
        </control-button>
      </controls>
    </vue-flow>
    <core-confirmation-modal ref="removeElementModal" @confirmed="confirmedHandler" @canceled="canceledHandler">
      <b-table striped hover :items="nodeToRemove"></b-table>
      <b-table striped hover :items="edgeToRemove"></b-table>
    </core-confirmation-modal>
  </div>
</template>

<script lang="ts" src="./flow.component.ts"></script>
