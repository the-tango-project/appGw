<template>
  <b-col class="alert-info-card">
    <div class="mb-4"></div>
    <b-row align-v="center">
      <b-col></b-col>
      <b-col cols="2">
        <span class="rounded-circle shadow p-3 mt-1 bg-white d-inline-block">
          <b-icon icon="info-circle" font-scale="3"></b-icon>
        </span>
      </b-col>
      <b-col cols="6" class="m-3 p-3 text-center">
        <span class="float-right text-center">
          <p class="text-secondary" v-text="$t('global.messages.info.add-items')"></p>
          <h3 v-text="$t('global.messages.info.empty-content')"></h3>
        </span>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-col>
</template>
<script lang="ts" src="./empty-content.component.ts"></script>
