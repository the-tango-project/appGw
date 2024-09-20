<template>
  <b-row class="mt-5" align-v="center">
    <b-overlay opacity=".25" show="true" rounded="sm">
      <b-img v-b-hover="handleHover" src="content/images/messages/add.svg" fluid></b-img>
      <template #overlay>
        <span class="float-right text-center">
          <p class="text-secondary" v-text="$t('global.messages.info.add-items')"></p>
          <h3 v-text="$t('global.messages.info.empty-content')"></h3>
        </span>
      </template>
    </b-overlay>
  </b-row>
</template>
<script lang="ts" src="./empty-content.component.ts"></script>
