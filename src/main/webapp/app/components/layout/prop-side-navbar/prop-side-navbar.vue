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
    <slot name="title">
      <div class="text-center logo">
        <img src="../../../../content/images/apeiron.png" class="logo-img" alt="apeiron" />
      </div>
    </slot>

    <b-navbar-nav class="sidebar p-1">
      <div class="sidebar_header mb-3 mt-1">
        <div class="text-white">Secciones</div>
      </div>
      <core-state v-model="stateToEdit" @update:state="updateStateHandler"></core-state>
      <b-button @click="save()" variant="primary">
        <span v-text="$t('entity.action.save')"></span>
        <b-icon icon="save"></b-icon>
      </b-button>
    </b-navbar-nav>
  </b-sidebar>
</template>

<script lang="ts" src="./prop-side-navbar.component.ts"></script>
