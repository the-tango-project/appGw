<template>
  <b-alert show :variant="variant">
    <h4 v-if="title" class="alert-heading">{{ title }}</h4>
    <div v-if="description" v-html="description"></div>
    <slot></slot>
    <div v-if="footer">
      <hr />
      <p class="mb-0" v-html="footer"></p>
    </div>
  </b-alert>
</template>

<script lang="ts" src="./message.component.ts"></script>
