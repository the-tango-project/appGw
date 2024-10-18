<template>
  <b-sidebar
    class="left-sidebar"
    width="100%"
    :visible="true"
    shadow
    no-close-on-backdrop
    no-close-on-esc
    no-close-on-route-change
    no-enforce-focus
    no-header-close
  >
    <b-navbar-nav class="sidebar p-1">
      <div class="sidebar_header mb-3 mt-1">
        <div class="text-white">Secciones</div>
      </div>
      <b-row class="mt-3">
        <b-col class="text-right">
          <core-button class="mr-1" @click="cancel()" type="cancel"></core-button>
          <core-button class="mr-1" @click="save()" type="save"></core-button>
        </b-col>
      </b-row>
    </b-navbar-nav>
  </b-sidebar>
</template>

<script lang="ts" src="./right-side-navbar.component.ts"></script>
