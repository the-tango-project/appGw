<template>
  <div>
    <select-state v-if="stateToEdit" v-model="stateToEdit.nombre" onlyNotSelected></select-state>
    <core-granted-authorities v-if="stateToEdit" :stateName="stateToEdit.nombre" v-model="stateToEdit.permisos"></core-granted-authorities>
  </div>
</template>

<script lang="ts" src="./state.component.ts"></script>
