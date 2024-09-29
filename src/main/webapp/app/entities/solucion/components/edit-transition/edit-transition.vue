<template>
  <b-container fluid>
    <b-row class="text-center" v-if="transition">
      <b-col cols="5">
        <b-form-group id="componente-add-accion" size="sm" label="Acción" label-for="add-accion">
          <b-form-select
            :state="transition.accion ? true : false"
            id="add-accion"
            v-model="transition.accion"
            :options="actionOptions"
            class="mb-3"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="2">
        <b-icon class="align-middle mt-4" icon="arrow-bar-right" font-scale="3"></b-icon>
      </b-col>
      <b-col cols="5">
        <b-form-group id="componente-add-destino" size="sm" label="Destino" label-for="add-destino">
          <b-form-select
            :state="transition.destino ? true : false"
            id="add-destino"
            v-model="transition.destino"
            :options="stateOptions"
            class="mb-3"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="transition">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-mensaje variant="primary">
            <b-icon icon="chat-left"></b-icon>
            {{ $t('apeironGwApp.transicion.message.confirm') }}
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-mensaje" accordion="mensaje" role="tabpanel">
          <b-card-body>
            <b-form-checkbox v-model="transition.confirmar" name="requiere-confirmacion" switch>
              {{ $t('apeironGwApp.transicion.message.dobleCheckQuestion') }}
            </b-form-checkbox>
            <b-form-checkbox v-model="transition.agregarComentario" name="requiere-agregar-comentario" switch>
              {{ $t('apeironGwApp.transicion.message.addMessageQuestion') }}
            </b-form-checkbox>
            <br />
            <b-form-group id="componente-add-mensaje" size="sm" label="Mensaje de confirmación" label-for="mensaje-confirmacion">
              <core-text-editor id="mensaje-confirmacion" v-model="transition.mensaje"></core-text-editor>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" src="./edit-transition.component.ts"></script>
