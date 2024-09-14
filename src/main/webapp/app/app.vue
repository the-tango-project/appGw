<template>
  <div id="app" class="wrapper-remove">
    <div id="wrapper" :class="{ 'toggled-left': !sideNavbarStore.isLeftOpened, 'toggled-right': !sideNavbarStore.isRightOpened }">
      <ribbon></ribbon>

      <!-- Left Sidebar -->
      <div id="left-sidebar-wrapper">
        <core-side-navbar></core-side-navbar>
      </div>

      <!-- Right Sidebar -->
      <div id="right-sidebar-wrapper">
        <right-side-navbar></right-side-navbar>
      </div>
      <!-- Page content -->
      <div id="page-content-wrapper">
        <jhi-navbar></jhi-navbar>
        <div v-if="!authenticated" class="jumbotron bg-primary text-white">
          <div class="container">
            <h1 class="display-1">Ápeiron Flow</h1>
            <p class="lead">Codeless platform</p>
          </div>
        </div>
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
