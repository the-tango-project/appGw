<template>
  <core-select-one v-if="stateToEdit" label="Estado" v-model="stateToEdit.nombre" :options="stateOptions"></core-select-one>

  <core-granted-authorities v-if="stateToEdit" :stateName="stateToEdit.nombre" v-model="stateToEdit.permisos"></core-granted-authorities>
</template>

<script lang="ts" src="./state.component.ts"></script>
