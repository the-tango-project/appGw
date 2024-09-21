<template>
  <div class="container">
    <span v-if="error403" class="error403 img-fluid rounded"></span>
    <span v-if="error404" class="error404 img-fluid rounded"></span>
    <div v-if="errorMessage">
      <div class="alert alert-danger">{{ errorMessage }}</div>
    </div>
    <div class="text-center" v-if="error403" v-text="t$('error.http.403')"></div>
    <div class="text-center" v-if="error404" v-text="t$('error.http.404')"></div>
  </div>
</template>

<script lang="ts" src="./error.component.ts"></script>
