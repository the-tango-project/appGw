<template>
  <div>
    <label v-if="label" for="tags-pills">{{ label }}</label>
    <b-form-tags
      input-id="tags-pills"
      v-model="tags"
      :tag-variant="variant"
      tag-pills
      :size="size"
      :limit="limit"
      :disabled="disabled"
      :placeholder="placeholder"
    ></b-form-tags>
  </div>
</template>

<script lang="ts" src="./tags.component.ts"></script>
