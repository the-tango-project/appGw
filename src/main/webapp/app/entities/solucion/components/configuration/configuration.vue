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
    <b-card class="mt-3 shadow rounded border-dark">
      <b-form-group
        size="sm"
        :label="$t('archeApp.solucion.seccion.configuration.authorities.title')"
        label-for="add-roles"
        class="text-left"
      >
        <b-form-checkbox-group
          :disabled="true"
          id="add-roles-to-process"
          v-model="currentAuthorities"
          :options="authorityOptions"
          stacked
        ></b-form-checkbox-group>
      </b-form-group>
      <core-button class="float-right" type="edit" @click="openUpdateAuthoritiesModal()"></core-button>
    </b-card>
    <core-base-modal ref="updateAuthoritiesModal" @confirmed="updateAuthoritiesHandler">
      <core-message
        variant="warning"
        :title="$t('archeApp.solucion.seccion.configuration.authorities.messages.danger-zone.title')"
        :description="$t('archeApp.solucion.seccion.configuration.authorities.messages.danger-zone.description')"
      ></core-message>
      <b-form-group
        size="sm"
        :label="$t('archeApp.solucion.seccion.configuration.authorities.title')"
        label-for="add-authorities-to-process"
        class="text-left"
      >
        <b-form-checkbox-group
          id="add-authorities-to-process"
          v-model="authoritiesToEdit"
          :options="authorityOptions"
          stacked
        ></b-form-checkbox-group>
      </b-form-group>
    </core-base-modal>
  </div>
</template>

<script lang="ts" src="./configuration.component.ts"></script>
