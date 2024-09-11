<template>
  <b-row v-if="solution">
    <b-col>
      <core-code-editor :key="codeFormKey" v-model="solution.mailTemplate" lang="text/html"></core-code-editor>
    </b-col>
    <b-col> <b-embed type="iframe" aspect="16by9" :srcdoc="solution.mailTemplate" allowfullscreen></b-embed> </b-col>
  </b-row>
</template>

<script lang="ts" src="./email-template.component.ts"></script>
