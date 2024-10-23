<template>
  <b-form-group size="sm" label="Acción" label-for="add-accion">
    <b-form-select :state="selected ? true : false" id="add-accion" v-model="selected" :options="actionOptions" class="mb-3">
    </b-form-select>
  </b-form-group>
</template>

<script lang="ts" src="./select-action.component.ts"></script>
