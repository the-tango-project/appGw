<template>
  <div>
    <b-card class="mb-4">
      <div class="text-center">
        <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
      </div>
      <b-card-text class="mt-5">
        <b-skeleton animation="fade" width="87%"></b-skeleton>
        <b-skeleton animation="fade" width="55%"></b-skeleton>
        <b-skeleton animation="fade" width="70%"></b-skeleton>
        <b-skeleton animation="fade" width="79%"></b-skeleton>
        <b-skeleton animation="fade" width="50%"></b-skeleton>
      </b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts" src="./welcome-skeleton.component.ts"></script>
<style lang="scss" scoped></style>
