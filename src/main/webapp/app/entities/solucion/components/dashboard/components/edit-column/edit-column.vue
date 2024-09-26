<template>
  <div class="modal-body container-fluid">
    <div class="row">
      <div class="col">
        <b-tabs v-if="columnSelected">
          <b-tab @click="visible = true">
            <template #title>
              <b-icon icon="code"></b-icon>
              {{ $t('archeApp.solucion.seccion.dashboard.editor.code.title') }}
            </template>
            <core-code-editor v-model="columnSelected.expresion" lang="text/javascript"></core-code-editor>

            <b-form-group id="fieldset-horizontal" class="mt-3" label="Resultado" label-for="result-script">
              <div id="result-script" class="bg-light" :set="(execution = execute(columnSelected.expresion))">
                <span v-if="execution.isValid && !execution.showResultAsObject">{{ execution.data }} </span>
                <span v-if="!execution.isValid" class="text-danger"
                  ><b-icon class="mr-2" icon="exclamation-circle"></b-icon><em>{{ execution.data }}</em></span
                >
                <!-- <json-view v-if="execution.showResultAsObject" :data="execution.data" /> -->
              </div>
            </b-form-group>
          </b-tab>
          <b-tab @click="visible = false">
            <template #title>
              <b-icon :icon="columnSelected?.roles?.length && columnSelected.roles.length > 0 ? 'people-fill' : 'people'"></b-icon>
              {{ $t('archeApp.solucion.seccion.dashboard.permisos.label') }}
            </template>
            <b-card-body class="overflow-auto">
              <b-form-checkbox-group id="add-permisos" stacked v-model="columnSelected.roles" :options="roles"></b-form-checkbox-group>
            </b-card-body>
          </b-tab>
          <b-tab @click="visible = false">
            <template #title>
              <b-icon :animation="columnSelected.filter ? 'fade' : ''" :icon="columnSelected.filter ? 'funnel-fill' : 'funnel'"></b-icon>
              {{ $t('logs.filter') }}
            </template>

            <core-empty-content v-if="!columnSelected?.filter"> </core-empty-content>
            <div v-else>
              <b-form-group label-cols="4" :label="$t('archeApp.solucion.seccion.dashboard.filtro.disable')">
                <b-form-checkbox size="lg" v-model="columnSelected.filter" name="check-button" switch> </b-form-checkbox>
              </b-form-group>
              <b-form-group label-cols="4" :label="$t('archeApp.solucion.seccion.dashboard.filtro.path.label')">
                <b-form-input
                  v-model="columnSelected.path"
                  :placeholder="$t('archeApp.solucion.seccion.dashboard.filtro.path.placeholder')"
                >
                </b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" :label="$t('archeApp.solucion.seccion.dashboard.filtro.tipo.label')">
                <b-form-select v-model="columnSelected.tipoReglaFiltro" :options="tipoReglasFiltro" class="mb-3"> </b-form-select>
              </b-form-group>
              <b-form-group
                v-if="columnSelected.tipoReglaFiltro === 'TEXT_IS_IN_LIST' || columnSelected.tipoReglaFiltro === 'TEXT_IS_NOT_IN_LIST'"
                label-cols="4"
                :label="$t('archeApp.solucion.seccion.dashboard.filtro.tipo.valores.label')"
              >
                <core-input-tags
                  id="filtro-list"
                  label="Types of components"
                  v-model="columnSelected.filtroValores"
                  :placeholder="$t('archeApp.solucion.seccion.dashboard.filtro.tipo.valores.placeholder')"
                ></core-input-tags>
              </b-form-group>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./edit-column.component.ts"></script>
