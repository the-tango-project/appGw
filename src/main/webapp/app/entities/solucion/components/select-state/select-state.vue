<template>
  <b-form-group id="componente-add-destino" size="sm" label="Destino" label-for="add-destino">
    <b-form-select :state="selected ? true : false" id="add-destino" v-model="selected" :options="stateOptions" class="mb-3">
    </b-form-select>
  </b-form-group>
</template>

<script lang="ts" src="./select-state.component.ts"></script>
