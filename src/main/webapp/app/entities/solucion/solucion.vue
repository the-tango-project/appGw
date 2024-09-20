<template>
  <div>
    <div class="container">
      <h2 id="page-heading" data-cy="SolucionHeading" class="mb-5">
        <span v-text="$t('archeApp.solucion.home.title')" id="solucion-heading"></span>
        <div class="d-flex justify-content-end">
          <router-link :to="{ name: 'SolucionCreate' }" custom v-slot="{ navigate }">
            <b-skeleton v-if="isFetching" type="button"></b-skeleton>
            <button
              v-else
              @click="navigate"
              id="jh-create-entity"
              data-cy="entityCreateButton"
              class="btn btn-primary jh-create-entity create-solucion"
            >
              <font-awesome-icon icon="plus"></font-awesome-icon>
              <span v-text="$t('archeApp.solucion.home.createLabel')"></span>
            </button>
          </router-link>
        </div>
      </h2>
      <core-card-list class="m-8" :items="solucionsCards" :show="!isFetching"></core-card-list>
      <span ref="infiniteScrollEl"></span>
      <core-card-list-skeleton v-if="isFetching"></core-card-list-skeleton>
    </div>
  </div>
</template>

<script lang="ts" src="./solucion.component.ts"></script>
