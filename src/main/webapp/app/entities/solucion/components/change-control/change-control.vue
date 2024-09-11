<template>
  <code-diff
    v-if="oldSolucion && newSolucion && hasChange"
    language="json"
    :filename="'solucion.json (v.' + solution.version + ')'"
    :old-string="oldSolucion"
    :new-string="newSolucion"
    output-format="side-by-side"
  />
  <div v-else>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <core-message
          variant="light"
          :title="$t('archeApp.solucion.seccion.versiones.nochanges')"
          :description="$t('archeApp.solucion.seccion.versiones.last', { version: solution.version })"
          :footer="'<i>' + $t('archeApp.solucion.seccion.versiones.footer') + '</i>'"
        ></core-message>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./change-control.component.ts"></script>
