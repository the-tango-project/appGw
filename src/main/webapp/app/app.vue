<template>
  <div id="app" class="wrapper-remove">
    <div id="wrapper" :class="{ 'toggled-left': !sideNavbarStore.isLeftOpened, 'toggled-right': !sideNavbarStore.isLeftOpened }">
      <ribbon></ribbon>

      <!-- Left Sidebar -->
      <div id="left-sidebar-wrapper">
        <core-side-navbar></core-side-navbar>
      </div>

      <!-- Right Sidebar -->
      <div id="right-sidebar-wrapper">
        <core-side-navbar></core-side-navbar>
      </div>

      <!-- Page content -->
      <div id="page-content-wrapper">
        <jhi-navbar></jhi-navbar>
        <div class="container-fluid">
          <div class="jh-card">
            <router-view></router-view>
          </div>
          <b-modal id="login-page" hide-footer lazy>
            <template #modal-title>
              <span data-cy="loginTitle" id="login-title" v-text="t$('login.title')"></span>
            </template>
            <login-form></login-form>
          </b-modal>
          <jhi-footer></jhi-footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
