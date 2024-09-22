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
        <hero-image :show="!authenticated"></hero-image>
        <div class="container-fluid">
          <div class="jh-card">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
          <b-modal
            id="login-page"
            hide-footer
            :centered="true"
            header-text-variant="light"
            header-bg-variant="primary"
            header-border-variant="light"
            lazy
          >
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
