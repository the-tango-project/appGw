<template>
  <div>
    <div v-for="(permiso, i) in permisos">
      <core-accordion
        :title="$t('apeironGwApp.RolAutoridad.' + permiso.rol)"
        :icon="permiso.acciones?.length != undefined && permiso.acciones.length > 0 ? 'eye-fill' : 'eye-slash'"
      >
        <b-tabs fill content-class="mt-3">
          <b-tab :title="$t('appGwApp.process.state.actions.title')">
            <b-form-group size="sm" :label="$t('archeApp.solucion.seccion.dashboard.permisos.label')" label-for="add-actions">
              <b-form-checkbox-group v-model="permiso.acciones" :options="actionsOptions"></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab :title="$t('appGwApp.process.state.actions.transitionMessage')">
            <core-aviso-editable v-model="permiso.aviso"></core-aviso-editable>
          </b-tab>
        </b-tabs>
      </core-accordion>
    </div>
  </div>
</template>

<script lang="ts" src="./granted-authorities.component.ts"></script>
