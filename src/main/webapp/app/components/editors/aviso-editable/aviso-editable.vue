<template>
  <div class="container">
    <div class="row float-right">
      <b-button :variant="showPreview ? 'primary' : 'light'" @click="togglePreview">
        <b-icon :icon="showPreview ? 'stop-circle' : 'play-circle'" :animation="showPreview ? 'fade' : ''"> </b-icon>
        {{ $t('entity.action.preview') }}
      </b-button>
    </div>
    <div v-if="!showPreview" class="row">
      <div class="col-10">
        <core-select-one label="Tipo de aviso" v-model="aviso.tipo" :options="tipoAvisoOptions"></core-select-one>
      </div>
    </div>
    <div class="row">
      <div v-if="!showPreview" class="col">
        <b-alert show :variant="aviso.tipo ? aviso.tipo.toLowerCase() : ''">
          <h4 class="alert-heading">
            <b-form-group id="componente-aviso-titulo" size="sm" label="Título" label-for="aviso-titulo-id">
              <b-form-input id="aviso-titulo-id" v-model="aviso.titulo"></b-form-input>
            </b-form-group>
          </h4>
          <div>
            <b-form-group id="componente-aviso-descripcion" size="sm" label="Descripción" label-for="aviso-descripcion-id">
              <core-text-editor v-model="aviso.descripcion"></core-text-editor>
            </b-form-group>
          </div>
          <div>
            <hr />
            <p class="mb-0">
              <b-form-group id="componente-aviso-pie-de-pagina" size="sm" label="Pie de paǵina" label-for="aviso-pie-de-pagina-id">
                <b-form-input id="mensaje-bienvenida" v-model="aviso.pieDePagina"></b-form-input>
              </b-form-group>
            </p>
          </div>
        </b-alert>
      </div>
      <div v-else class="col mt-5">
        <core-message
          :variant="aviso.tipo ? aviso.tipo.toLowerCase() : ''"
          :title="aviso.titulo"
          :description="aviso.descripcion"
          :footer="aviso.pieDePagina"
        ></core-message>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./aviso-editable.component.ts"></script>
