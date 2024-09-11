<template>
  <div class="form-group">
    <label class="form-control-label" v-text="label"></label>
    <div class="d-flex">
      <input
        data-cy="creationDate"
        type="datetime-local"
        class="form-control"
        name="creationDate"
        :value="convertDateTimeFromServer(dateTime)"
        @change="updateInstantField($event)"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./date-time-picker.component.ts"></script>
