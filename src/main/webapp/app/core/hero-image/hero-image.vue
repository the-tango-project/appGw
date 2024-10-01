<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="jumbotron jumbotron-fluid bg-primary text-white">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="display-4">{{ $t('global.title') }}</h1>
            <p class="lead">{{ $t('global.subtitle') }}</p>
            <b-button class="shadow d-inline-block border-1" variant="outline-light" size="lg" v-on:click="openLogin()">{{
              $t('global.menu.account.login')
            }}</b-button>
          </div>
          <div class="col">
            <b-img src="content/images/home/hero-image.svg" fluid alt="Responsive image"></b-img>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./hero-image.component.ts"></script>
