<template>
  <div v-if="solution">
    <b-form-group label-cols="3" :label="$t('archeApp.solucion.seccion.parametros.calendario.fecha.apertura')">
      <core-date-time-picker v-model="solution.calendario.fechaInicio" />
    </b-form-group>
  </div>
</template>

<script lang="ts" src="./configuration.component.ts"></script>
