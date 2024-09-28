<template>
  <div>
    <div class="row text-center" v-if="transition">
      <div class="col-5">
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
      </div>
      <div class="col-2">
        <br />
        <b-icon class="align-middle" icon="arrow-bar-right" font-scale="3"></b-icon>
      </div>
      <div class="col-5">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./edit-transition.component.ts"></script>
