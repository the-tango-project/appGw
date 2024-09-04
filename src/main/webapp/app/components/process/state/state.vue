<template>
  <core-select-one
    v-if="stateToEdit?.state?.nombre"
    label="Estado"
    v-model="stateToEdit.state.nombre"
    :options="stateOptions"
  ></core-select-one>

  <core-granted-authorities v-if="stateToEdit?.state" v-model="stateToEdit.state.permisos"></core-granted-authorities>
</template>

<script lang="ts" src="./state.component.ts"></script>
