<template>
  <div class="form-group">
    <label :for="id">
      {{ label }} <span v-if="required">*</span>
      <span v-if="tooltip || popover">
        <span :id="id + 'tooltip'" class="icon-info"></span>
        <b-tooltip v-if="tooltip" :target="id + 'tooltip'" :title="tooltip" placement="right"></b-tooltip>
        <b-popover v-if="popover" :target="id + 'tooltip'" triggers="hover">
          <div class="p-3">
            {{ popover }}
          </div>
        </b-popover>
      </span>
    </label>
    <b-form-input
      :placeholder="placeholder"
      :id="id"
      v-model="theModel"
      :state="valid"
      trim
      :readonly="readonly"
      type="text"
      :max="max"
    ></b-form-input>
    <small v-if="description" class="form-text helper-text">{{ description }}</small>
  </div>
</template>

<script lang="ts" src="./input-text.component.ts"></script>
