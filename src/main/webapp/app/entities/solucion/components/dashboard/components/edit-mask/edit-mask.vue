<template>
  <b-tabs pills card vertical>
    <b-tab v-for="rol in authorityOptions" :key="rol.value" @click="clickHandler">
      <template #title>
        <b-icon :icon="filterRol(rol.value).length > 0 ? 'mask' : 'circle'"></b-icon>
        {{ $t('apeironGwApp.RolAutoridad.' + rol.value) }}</template
      >
      <div class="container" v-if="mascara">
        <div class="row">
          <div class="col-5">
            <b-form-group id="componente-add-estado-actual" size="sm" label="Estado" label-for="add-estado-actual">
              <b-form-select id="add-estado-actual" v-model="mascara.estado" :options="estadoSolicitudOptions" class="mb-3">
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-2">
            <b-icon class="mt-4 ml-3 mr-3 align-middle" icon="box-arrow-in-right" font-scale="3"></b-icon>
          </div>
          <div class="col-5">
            <b-form-group id="componente-add-mascara" size="sm" label="Máscara" label-for="add-mascara">
              <b-form-select id="add-mascara" v-model="mascara.mascara" :options="estadoSolicitudOptions" class="mb-3"> </b-form-select>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <core-button
              v-if="mascara.estado && mascara.mascara && isValid(rol.value)"
              class="mr-1"
              @click="handleAddMascara(rol.value)"
              type="add"
            ></core-button>
            <core-message
              v-if="!isValid(rol.value)"
              :description="$t('archeApp.solucion.seccion.dashboard.estados.mascara.exist')"
              variant="warning"
            ></core-message>
          </div>
        </div>
      </div>
      <b-table
        class="mt-5"
        v-if="filterRol(rol.value).length > 0"
        :items="filterRol(rol.value)"
        :fields="['estado', 'flecha', 'mascara', 'acciones']"
        show-empty
      >
        <template #empty="">
          <h4>{{ $t('archeApp.solucion.seccion.autoridad.noAuthorities') }}</h4>
        </template>
        <template #head(flecha)="">
          <b-icon class="align-middle" icon="box-arrow-in-right" font-scale="1"></b-icon>
        </template>
        <template #head(mascara)=""> {{ $t('archeApp.solucion.seccion.dashboard.estados.mascara.label') }} </template>
        <template #cell(estado)="row">
          {{ $t('archeApp.EstadoSolicitud.' + row.item.estado) }}
        </template>
        <template #cell(mascara)="row">
          {{ $t('archeApp.EstadoSolicitud.' + row.item.mascara) }}
        </template>
        <template #cell(flecha)="">
          <b-icon class="align-middle" icon="box-arrow-in-right" font-scale="1"></b-icon>
        </template>
        <template #cell(acciones)="row">
          <b-button variant="danger" size="sm" class="mr-1" @click="handlePrepareToRemove(row.item)">
            {{ $t('entity.action.delete') }}</b-button
          >
        </template>
      </b-table>
    </b-tab>
  </b-tabs>
</template>

<script lang="ts" src="./edit-mask.component.ts"></script>
