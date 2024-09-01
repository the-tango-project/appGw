<template>
  <div>State management</div>
  <core-select-one
    v-if="stateToEdit?.state?.nombre"
    label="Estado"
    v-model="stateToEdit.state.nombre"
    :options="stateOptions"
  ></core-select-one>
</template>

<script lang="ts" src="./state.component.ts"></script>
