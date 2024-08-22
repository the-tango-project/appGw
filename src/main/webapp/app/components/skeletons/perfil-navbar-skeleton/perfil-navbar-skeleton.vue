<template>
  <b-overlay variant="transparent" spinner-variant="primary" spinner-type="none" show :opacity="1">
    <b-row class="mb-3" id="header-2a">
      <b-col cols="7" class="avatar">
        <b-overlay :show="true" :opacity="0">
          <b-avatar variant="primary" icon="none" size="4rem" class="avatar_img"></b-avatar>
        </b-overlay>

        <span>{{ account.firstName }} {{ account.lastName }}</span>
      </b-col>
      <b-col cols="5">
        <div class="user_cvu align-middle">
          <span class="font-weight-bold">{{ $t('apeironGwApp.persona.login') }}: </span>
          <span class="font-weight-bold">{{ $t('apeironGwApp.persona.noCvu') }}: </span>
        </div>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script lang="ts" src="./perfil-navbar-skeleton.component.ts"></script>
<style lang="scss" scoped></style>
