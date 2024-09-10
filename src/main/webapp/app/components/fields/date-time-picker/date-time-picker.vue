<template>
  <label v-if="label" class="form-control-label">{{ label }}</label>
  {{ dateTime }}
  <b-row>
    <b-col cols="4"><b-form-datepicker locale="es"></b-form-datepicker></b-col>
    <b-col cols="2"> <b-form-timepicker locale="en"></b-form-timepicker></b-col>
  </b-row>
</template>

<script lang="ts" src="./date-time-picker.component.ts"></script>
