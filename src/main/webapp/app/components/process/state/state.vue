<template>
  <core-select-one v-if="stateToEdit?.state" label="Estado" v-model="stateToEdit.state.nombre" :options="stateOptions"></core-select-one>

  <core-granted-authorities
    v-if="stateToEdit?.state"
    :stateName="stateToEdit.state.nombre"
    v-model="stateToEdit.state.permisos"
  ></core-granted-authorities>
</template>

<script lang="ts" src="./state.component.ts"></script>
