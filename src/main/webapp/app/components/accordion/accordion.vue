<template>
  <div>
    <b-card-header header-tag="header" class="p-1 border-0" role="tab">
      <b-button class="text-left" block v-b-toggle="id" :variant="variant">
        <b-icon class="mr-2" :icon="icon"></b-icon>
        {{ title }}
        <b-icon class="float-right when-closed" icon="chevron-compact-down"></b-icon>
        <b-icon class="float-right when-open" icon="chevron-compact-up"></b-icon>
      </b-button>
    </b-card-header>
    <b-collapse :id="id" role="tabpanel">
      <b-card-body>
        <slot></slot>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./accordion.component.ts"></script>
<style lang="scss" scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
