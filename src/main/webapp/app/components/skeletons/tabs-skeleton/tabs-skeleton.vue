<template>
  <b-card class="mb-4">
    <b-tabs content-class="mt-3" fill>
      <b-tab class="mt-4" v-for="index in 8" :key="index">
        <template #title>
          <div class="row">
            <div class="col"><b-skeleton type="button"></b-skeleton></div>
          </div>
        </template>
      </b-tab>
    </b-tabs>
    <div class="text-center">
      <b-skeleton-img no-aspect height="250px"></b-skeleton-img>
    </div>
    <div class="m-2 tmb-5 mt-5 float-right">
      <b-skeleton type="button"></b-skeleton>
    </div>
  </b-card>
</template>

<script lang="ts" src="./tabs-skeleton.component.ts"></script>
<style lang="scss" scoped></style>
