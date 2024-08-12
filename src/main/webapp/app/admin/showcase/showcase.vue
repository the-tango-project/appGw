<template>
  <div>
    <header class="bx-header-title">
      <h3>Card list</h3>
      {{ items }}
      <div class="header-title-line"></div>
    </header>
    <core-card-list></core-card-list>

    <header class="bx-header-title">
      <h3>Empty content</h3>
      <div class="header-title-line"></div>
    </header>
    <core-empty-content></core-empty-content>
  </div>
</template>

<script lang="ts" src="./showcase.component.ts"></script>
