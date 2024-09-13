<template>
  <div>
    <div v-if="authority">
      <b-card v-if="authority.usuarioId" class="pr-3 shadow rounded border-dark">
        <div class="row">
          <div class="col-2 text-left">
            <strong>{{ $t('global.field.id') }}</strong>
          </div>
          <div class="col text-left">{{ authority.usuarioId }}</div>
        </div>
        <div class="row">
          <div class="col-2 text-left">
            <strong>{{ $t('userManagement.firstName') }}</strong>
          </div>
          <div class="col text-left">{{ (authority.nombre ?? '') + ' ' + (authority.apellidoPaterno ?? '') }}</div>
        </div>
        <div class="row">
          <div class="col-2 text-left">
            <strong>{{ $t('userManagement.login') }}</strong>
          </div>
          <div class="col text-left">{{ authority.login }}</div>
        </div>
      </b-card>
      <b-card v-if="authority.usuarioId && !noRoles" class="mt-3 shadow rounded border-dark">
        <b-form-group id="componente-add-roles" size="sm" label="Roles" label-for="add-roles" class="text-left">
          <b-form-checkbox-group id="add-roles" v-model="authority.roles" :options="authorityOptions" stacked></b-form-checkbox-group>
        </b-form-group>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts" src="./authority-details.component.ts"></script>
