<template>
  <b-button :variant="variant" @click="clickHandler">
    <b-icon v-if="icon" :icon="icon" class="mr-1"></b-icon>
    <span v-text="$t(i18nKeyText)"></span>
  </b-button>
</template>

<script lang="ts" src="./button.component.ts"></script>
