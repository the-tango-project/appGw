<template>
  <code-diff
    v-if="solution"
    language="json"
    :filename="'solucion.json (v.' + solution.version + ')'"
    :old-string="oldSolucion"
    :new-string="newSolucion"
    output-format="side-by-side"
  />
</template>

<script lang="ts" src="./change-control.component.ts"></script>
