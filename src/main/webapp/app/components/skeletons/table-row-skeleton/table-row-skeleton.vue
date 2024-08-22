<template>
  <div>
    <hr class="hr hr-blurry" />
    <b-skeleton-table v-if="showFull" :rows="5" :columns="5" :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
    <div v-else v-for="index in 7" :key="index">
      <b-skeleton class="mb-4" width="100%"></b-skeleton>
      <hr class="hr hr-blurry" />
    </div>
  </div>
</template>

<script lang="ts" src="./table-row-skeleton.component.ts"></script>
