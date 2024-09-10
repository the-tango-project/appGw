<template>
  <b-card v-if="solution">
    <b-form-group label-cols="2" :label="$t('archeApp.solucion.seccion.mensaje.bienvenida.solicitante')">
      <core-text-editor id="mensaje-bienvenida-solicitante" v-model="solution.mensaje.bienvenida"></core-text-editor>
    </b-form-group>
    <b-form-group class="mt-5" label-cols="2" :label="$t('archeApp.solucion.seccion.mensaje.bienvenida.revisor')">
      <core-text-editor id="mensaje-bievenida-revisor" v-model="solution.mensaje.bienvenidaRevision"></core-text-editor>
    </b-form-group>
    <b-form-group class="mt-5" label-cols="2" :label="$t('archeApp.solucion.seccion.mensaje.terminos.revisor')">
      <core-text-editor id="mensaje-terminos" v-model="solution.mensaje.terminosRevision"></core-text-editor>
    </b-form-group>
    <b-form-group class="mt-5 mb-5" label-cols="2" :label="$t('archeApp.solucion.seccion.mensaje.bienvenida.operador')">
      <core-text-editor id="mensaje-bienvenida-operador" v-model="solution.mensaje.bienvenidaOperador"></core-text-editor>
    </b-form-group>
  </b-card>
</template>

<script lang="ts" src="./messages.component.ts"></script>
