<template>
  <div v-if="solucion">
    <div class="form-group" v-if="solucion.id">
      <b-alert show>
        <span
          ><strong>{{ $t('archeApp.solucion.identificador') }}:</strong> <i>{{ solucion.id }}</i></span
        >
      </b-alert>
    </div>
    <div class="form-group">
      <label class="form-control-label" v-text="$t('archeApp.solucion.titulo')" for="solucion-titulo"></label>
      <input type="text" class="form-control" name="titulo" id="solucion-titulo" data-cy="titulo" v-model="solucion.titulo" />
    </div>
    <div class="form-group">
      <label class="form-control-label" v-text="$t('archeApp.solucion.descripcion')" for="solucion-descripcion"></label>
      <b-form-textarea id="solucion-descripcion" v-model="solucion.descripcion" rows="2" max-rows="2"></b-form-textarea>
    </div>
    <div class="form-group">
      <label class="form-control-label" v-text="$t('archeApp.solucion.tipoSolucion')" for="solucion-tipo-solucion"></label>
      <b-form-select id="solucion-tipo-solucion" v-model="solucion.tipo" :options="tipoSolutionOptions" class="mb-3"> </b-form-select>
    </div>
    <div class="form-group">
      <label class="form-control-label" v-text="$t('archeApp.solucion.tipoAcceso')" for="solucion-tipo-acceso"></label>
      <b-form-select id="solucion-tipo-acceso" v-model="solucion.tipoAcceso" :options="tipoAccessOptions" class="mb-3"> </b-form-select>
    </div>
    <div class="form-group">
      <core-input-tags id="tags-id" :label="$t('archeApp.solucion.seccion.general-data.tags')" v-model="solucion.tags"></core-input-tags>
    </div>
    <div class="form-group">
      <label class="form-control-label" v-text="$t('archeApp.solucion.visible')" for="solucion-visible-id"></label>
      <div class="row">
        <b-icon
          class="ml-3"
          font-scale="2"
          :variant="solucion.visible ? 'primary' : 'secondary'"
          :icon="solucion.visible ? 'eye' : 'eye-slash'"
        ></b-icon>
        <b-form-checkbox
          button-variant="danger"
          id="solucion-visible-id"
          class="ml-2"
          v-model="solucion.visible"
          name="solucion-visible"
          size="lg"
          switch
        >
        </b-form-checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./general-data.component.ts"></script>
