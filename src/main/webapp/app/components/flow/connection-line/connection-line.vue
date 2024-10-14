<script setup>
defineProps({
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <g>
    <path
      class="vue-flow__connection animated"
      fill="none"
      stroke="#6F3381"
      :stroke-width="2.1"
      :d="`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`"
    />

    <circle :cx="targetX" :cy="targetY" fill="#fff" :r="4" stroke="#6F3381" :stroke-width="1.2" />
    <rect
      width="130"
      height="60"
      :x="targetX"
      :y="targetY - 30"
      rx="10"
      ry="10"
      fill="white"
      style="stroke: black; stroke-width: 1; opacity: 0.5"
    />
  </g>
</template>
