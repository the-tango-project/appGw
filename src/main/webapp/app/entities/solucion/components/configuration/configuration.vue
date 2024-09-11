<template>
  <div v-if="solution">
    <core-date-time-picker
      class="col-3"
      :label="$t('archeApp.solucion.seccion.parametros.calendario.fecha.apertura')"
      v-model="solution.calendario.fechaInicio"
    />
    <core-date-time-picker
      class="col-3"
      :label="$t('archeApp.solucion.seccion.parametros.calendario.fecha.limite.recibir')"
      v-model="solution.calendario.fechaFinSolicitud"
    />
    <core-date-time-picker
      class="col-3"
      :label="$t('archeApp.solucion.seccion.parametros.calendario.fecha.limite.revision')"
      v-model="solution.calendario.fechaFinRevision"
    />
    <core-date-time-picker
      class="col-3"
      :label="$t('archeApp.solucion.seccion.parametros.calendario.fecha.limite.reconsideracion')"
      v-model="solution.calendario.fechaFinReconsideracion"
    />
    <b-form-group class="col-3" :label="$t('archeApp.solucion.seccion.parametros.numeroMaximoDeSolicitudes')">
      <b-form-spinbutton v-model="solution.configuracion.maxNumberOfSolicitudesPerUser" wrap min="0" max="25" inline></b-form-spinbutton>
    </b-form-group>
  </div>
</template>

<script lang="ts" src="./configuration.component.ts"></script>
