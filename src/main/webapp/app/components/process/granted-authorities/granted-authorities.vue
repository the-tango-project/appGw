<template>
  <div>
    <div v-for="(permiso, i) in permisos">
      <b-card-header :key="i" header-tag="header" class="p-1" role="tab">
        <b-button class="text-left" block @click="toggle(permiso.rol)" variant="primary">
          <b-icon v-if="permiso.acciones?.length != undefined && permiso.acciones.length > 0" class="text-left" icon="eye-fill"></b-icon>
          <b-icon v-else icon="eye-slash"></b-icon>
          {{ $t('apeironGwApp.RolAutoridad.' + permiso.rol) }}
        </b-button>
      </b-card-header>
      <b-collapse :visible="toggledMap.get(permiso.rol)" role="tabpanel">
        <b-card-body>
          <b-tabs fill content-class="mt-3">
            <b-tab :title="$t('appGwApp.process.state.actions.title')">
              <b-form-group size="sm" label="Permisos" label-for="add-actions">
                <b-form-checkbox-group v-model="permiso.acciones" :options="actionsOptions"></b-form-checkbox-group>
              </b-form-group>
            </b-tab>
            <b-tab :title="$t('appGwApp.process.state.actions.transitionMessage')">
              <core-aviso-editable v-model="permiso.aviso"></core-aviso-editable>
            </b-tab>
          </b-tabs>
        </b-card-body>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts" src="./granted-authorities.component.ts"></script>
