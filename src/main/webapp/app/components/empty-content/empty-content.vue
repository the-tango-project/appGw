<template>
  <b-row class="mt-5" align-v="center">
    <b-col>
      <span class="">
        <h3 v-text="$t('global.messages.info.empty-content')"></h3>
        <p class="text-secondary" v-text="$t('global.messages.info.add-items')"></p>
        <b-button class="shadow d-inline-block border-0" variant="outline-primary" size="lg" pill @click="addHandler">
          <b-icon icon="plus"></b-icon>
        </b-button>
      </span>
    </b-col>
    <b-col cols="8">
      <b-img class="opacity-75" v-b-hover="handleHover" src="content/images/messages/empty.svg" fluid></b-img>
    </b-col>
  </b-row>
</template>
<script lang="ts" src="./empty-content.component.ts"></script>
