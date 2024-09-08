<template>
  <b-button class="shadow d-inline-block border-0" :variant="variant" @click="clickHandler">
    <b-icon v-if="icon" :icon="icon" :class="{ 'mr-1': !notext }"></b-icon>
    <span v-if="!notext" v-text="$t(i18nKeyText)"></span>
  </b-button>
</template>

<script lang="ts" src="./button.component.ts"></script>
