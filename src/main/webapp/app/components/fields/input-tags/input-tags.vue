<template>
  <div class="form-group">
    <label :for="id">
      {{ label }} <span v-if="required" class="text-danger">*</span>
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

    <vueform-multi-select
      :key="selectFormKey"
      v-model="theModel"
      :placeholder="selectOptionPlaceholder"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      :options="formVueOptions"
    ></vueform-multi-select>
    <small v-if="description" class="form-text helper-text">{{ description }}</small>
  </div>
</template>

<script lang="ts" src="./input-tags.component.ts"></script>
<style src="@vueform/multiselect/themes/default.css"></style>
