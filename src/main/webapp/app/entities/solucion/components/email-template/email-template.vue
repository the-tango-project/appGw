<template>
  <b-row v-if="solution">
    <b-col v-if="editHtml">
      <core-code-editor :key="codeFormKey" v-model="solution.mailTemplate" lang="text/html"></core-code-editor>
    </b-col>
    <b-col>
      <b-button variant="primary" size="sm" class="float-left" @click="loadMailTemplate"
        ><b-icon :icon="editHtml ? 'chevron-double-left' : 'chevron-double-right'"></b-icon
      ></b-button>
      <b-embed type="iframe" aspect="16by9" :srcdoc="solution.mailTemplate" allowfullscreen></b-embed>
    </b-col>
  </b-row>
</template>

<script lang="ts" src="./email-template.component.ts"></script>
