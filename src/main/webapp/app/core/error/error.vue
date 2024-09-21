<template>
  <b-container>
    <b-row class="mt-5" align-v="center">
      <b-col cols="4">
        <div class="text-right">
          <div v-if="errorMessage">
            <div class="alert alert-danger">{{ errorMessage }}</div>
          </div>
          <div class="text-center">
            <h4 class="text-secondary" v-if="error403" v-text="t$('error.http.403')"></h4>
            <h4 class="text-secondary" v-if="error404" v-text="t$('error.http.404')"></h4>

            <b-button class="shadow d-inline-block border-2 mt-2" variant="light" size="lg" @click="goHomeHandler">
              {{ $t('entity.action.go-home') }}
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col cols="8">
        <span v-if="error403" class="error403 img-fluid rounded"></span>
        <span v-if="error404" class="error404 img-fluid rounded"></span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" src="./error.component.ts"></script>
