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
        <transition name="fade" mode="out-in">
          <div v-if="!authenticated" class="jumbotron jumbotron-fluid bg-primary text-white opacity-75">
            <div class="container">
              <h1 class="display-4">{{ $t('global.title') }}</h1>
              <p class="lead">{{ $t('global.subtitle') }}</p>
            </div>
          </div>
        </transition>
        <div class="container-fluid">
          <div class="jh-card">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
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
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
