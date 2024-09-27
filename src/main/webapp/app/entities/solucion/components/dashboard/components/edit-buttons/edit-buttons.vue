<template>
  <div>
    <div class="btn-group">
      <core-button
        :title="button.tooltip"
        @click="openEditButtonModalHandler(index, button)"
        v-for="(button, index) in buttons"
        :key="index"
        class="mr-2"
        variant="outline-primary"
        :icon="button.icon"
        notext
      >
      </core-button>
    </div>
    <core-base-modal
      :title="$t('archeApp.solucion.seccion.dashboard.buttons.title')"
      ref="editarButtonModal"
      @confirmed="saveButtonsHandler"
    >
      <div class="modal-body" v-if="currentButtonEditable">
        <b-form-group label-cols="2" label-cols-lg="4" :label="$t('archeApp.solucion.seccion.dashboard.buttons.nombre.label')">
          <b-form-input v-model="currentButtonEditable.nombre"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="2" label-cols-lg="4" :label="$t('archeApp.solucion.seccion.dashboard.buttons.destino.label')">
          <b-form-input v-model="currentButtonEditable.destino"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="2" label-cols-lg="4" :label="$t('archeApp.solucion.seccion.dashboard.buttons.ayuda.label')">
          <b-form-input v-model="currentButtonEditable.tooltip"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="2" label-cols-lg="4" :label="$t('archeApp.solucion.seccion.dashboard.permisos.label')">
          <b-form-checkbox-group
            id="add-roles"
            v-model="currentButtonEditable.roles"
            :options="authorityOptions"
            stacked
            size="lg"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
    </core-base-modal>
  </div>
</template>

<script lang="ts" src="./edit-buttons.component.ts"></script>
