<template>
  <div>
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
  </div>
</template>

<script lang="ts" src="./control-buttons.components.ts"></script>
