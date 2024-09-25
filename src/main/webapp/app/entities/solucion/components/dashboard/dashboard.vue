<template>
  <div v-if="solution?.vistaResumen">
    <b-form-group :label="$t('archeApp.solucion.seccion.dashboard.properties.title')">
      <ul class="p-0">
        <li class="list-group-item shadow-sm border-0 mb-1 bg-white" v-for="(columna, index) in solution.vistaResumen.columnas">
          <div class="row">
            <div class="col-1"><b-icon variant="primary" font-scale="1.5" class="handle" icon="list"></b-icon></div>
            <div class="col-8">
              <b-form-input
                v-model="columna.nombre"
                :placeholder="$t('archeApp.solucion.seccion.dashboard.properties.placeholder')"
                size="sm"
              ></b-form-input>
            </div>
            <div class="col-1">
              <b-icon variant="primary" font-scale="1.2" :icon="columna.filter ? 'funnel-fill' : 'funnel'"></b-icon>
            </div>
            <div class="col-2 text-center float-right">
              <div>
                <b-button class="mr-1" @click="openCodeEditorModal(index)" variant="success" size="sm">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button variant="outline-danger" @click="handleDelete(index)" size="sm">
                  <b-icon icon="x"></b-icon>
                </b-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <b-button slot="footer" class="mt-3 btn-zoom shadow" @click="addVariable" variant="outline-success" block>
        <b-icon icon="plus"></b-icon><span>{{ $t('entity.action.add') }}</span>
      </b-button>
    </b-form-group>
    <b-table-simple small caption-top responsive>
      <caption>
        <div class="font-weight-bolder h4">{{ solution.titulo }}</div>
        <div v-if="solution.descripcion" v-html="solution.descripcion"></div>
      </caption>
      <b-thead head-variant="primary">
        <b-tr class="text-center">
          <b-th>{{ $t('archeApp.solucion.seccion.dashboard.table.solicitante') }}</b-th>
          <b-th v-for="(column, index) in solution.vistaResumen.columnas" :key="column.id">
            <b-button @click="openPermisosPerColumnEditorModal(index)" class="border-0" size="sm" variant="white">
              <b-avatar
                :icon="column?.roles?.length > 0 ? 'people-fill' : 'people'"
                :badge="column?.roles?.length.toString()"
                variant="primary"
                badge-variant="primary"
                badge-top
              ></b-avatar>
            </b-button>
            {{ column.nombre }}
          </b-th>
          <b-th>{{ $t('archeApp.solucion.estado') }}</b-th>
          <b-th> {{ $t('archeApp.solucion.seccion.dashboard.table.actions') }} </b-th>
        </b-tr>
      </b-thead>
      <b-tbody :set="(executions = [])">
        <b-tr class="text-center">
          <b-td>
            {{ solicitante }}
          </b-td>
          <b-td v-for="column in solution.vistaResumen.columnas" :key="column.id">
            <div :set="(executions[column.id] = execute(column.expresion))">
              <template v-if="executions[column.id]?.showResult">
                <span v-if="executions[column.id].isValid">{{ executions[column.id].data }}</span>
                <span v-else class="text-danger"
                  ><b-icon class="mr-2" icon="exclamation-circle"></b-icon><em>{{ executions[column.id].data }}</em></span
                >
              </template>
            </div>
          </b-td>
          <b-td>
            <b-button variant="info" size="sm" @click="handleOpenConfigEstadoModal">{{ $t('archeApp.solucion.estado') }}</b-button>
          </b-td>
          <b-td>
            <div class="btn-group">
              <core-button
                :title="button.tooltip"
                @click="handleOpenEditButtonModal(index, button)"
                v-for="(button, index) in solution.vistaResumen.buttons"
                :key="index"
                class="mr-2"
                variant="outline-primary"
                :icon="button.icon"
                notext
              >
              </core-button>
            </div>
          </b-td>
        </b-tr>
        <b-tr class="text-center" v-for="index in 5" :key="index">
          <b-td v-for="cols in customFieldNumber" :key="cols"><b-skeleton></b-skeleton></b-td>
          <b-td>
            <div class="btn-group">
              <core-button
                :icon="button.icon"
                :disabled="true"
                :title="button.tooltip"
                v-for="(button, index) in solution.vistaResumen.buttons"
                :key="index"
                class="mr-2"
                variant="light"
                notext
              >
              </core-button>
            </div>
          </b-td>
        </b-tr>
      </b-tbody>
      <b-tfoot v-if="solution.vistaResumen.pieDePagina">
        <div class="text-muted" style="white-space: pre-line" v-html="solution.vistaResumen.pieDePagina"></div>
      </b-tfoot>
    </b-table-simple>
    <b-modal
      size="xl"
      centered
      ref="codeEditorModal"
      header-bg-variant="primary"
      scrollable
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
    >
      <div slot="modal-title">
        <div class="col-8 text-left">
          <span>{{ $t('entity.action.edit') }}</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="row">
          <div :class="{ 'col-11': !visible, 'col-8': visible }">
            <b-tabs v-if="columnSelected">
              <b-tab @click="visible = true">
                <template #title>
                  <b-icon icon="code"></b-icon>
                  {{ $t('apeironGwApp.configCard.editor.code.title') }}
                </template>

                <b-form-group id="fieldset-horizontal" class="mt-3" label="Resultado" label-for="result-script">
                  <div id="result-script" class="bg-light" :set="(execution = execute(columnSelected.expresion))">
                    <span v-if="execution.isValid && !execution.showResultAsObject">{{ execution.data }} </span>
                    <span v-if="!execution.isValid" class="text-danger"
                      ><b-icon class="mr-2" icon="exclamation-circle"></b-icon><em>{{ execution.data }}</em></span
                    >
                    <json-view v-if="execution.showResultAsObject" :data="execution.data" />
                  </div>
                </b-form-group>
              </b-tab>
              <b-tab @click="visible = false">
                <template #title>
                  <b-icon :icon="columnSelected?.roles?.length > 0 ? 'people-fill' : 'people'"></b-icon>
                  {{ $t('apeironGwApp.configCard.permisos.label') }}
                </template>
                <b-card-body class="overflow-auto">
                  <b-form-checkbox-group id="add-permisos" stacked v-model="columnSelected.roles" :options="roles"></b-form-checkbox-group>
                </b-card-body>
              </b-tab>
              <b-tab @click="visible = false">
                <template #title>
                  <b-icon
                    :animation="columnSelected.filter ? 'fade' : ''"
                    :icon="columnSelected.filter ? 'funnel-fill' : 'funnel'"
                  ></b-icon>
                  {{ $t('logs.filter') }}
                </template>

                <core-empty-content v-if="!columnSelected?.filter"> </core-empty-content>
                <div v-else>
                  <b-form-group label-cols="4" :label="$t('apeironGwApp.configCard.filtro.disable')">
                    <b-form-checkbox size="lg" v-model="columnSelected.filter" name="check-button" switch> </b-form-checkbox>
                  </b-form-group>
                  <b-form-group label-cols="4" :label="$t('apeironGwApp.configCard.filtro.path.label')">
                    <b-form-input v-model="columnSelected.path" :placeholder="$t('apeironGwApp.configCard.filtro.path.placeholder')">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label-cols="4" :label="$t('apeironGwApp.configCard.filtro.tipo.label')">
                    <b-form-select v-model="columnSelected.tipoReglaFiltro" :options="tipoReglasFiltro" class="mb-3"> </b-form-select>
                  </b-form-group>
                  <b-form-group
                    v-if="columnSelected.tipoReglaFiltro === 'TEXT_IS_IN_LIST' || columnSelected.tipoReglaFiltro === 'TEXT_IS_NOT_IN_LIST'"
                    label-cols="4"
                    :label="$t('apeironGwApp.configCard.filtro.tipo.valores.label')"
                  >
                    <core-tags
                      id="filtro-list"
                      v-model="columnSelected.filtroValores"
                      variant="primary"
                      :placeholder="$t('apeironGwApp.configCard.filtro.tipo.valores.placeholder')"
                      size="md"
                    />
                  </b-form-group>
                </div>
              </b-tab>
            </b-tabs>
          </div>
          <b-collapse v-model="visible" class="mt-5 col-4">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-solucion variant="info">
                <b-icon icon="code"></b-icon>
                {{ $t('apeironGwApp.configCard.editor.code.variables.solucion') }}
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-solucion" accordion="solucion" role="tabpanel">
              <b-card-body class="overflow-auto">
                <json-view :data="solucion" rootKey="solucion" v-on:selected="addPathVariable" />
              </b-card-body>
            </b-collapse>
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-solicitud variant="info">
                <b-icon icon="code"></b-icon>
                {{ $t('apeironGwApp.configCard.editor.code.variables.solicitud') }}
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-solicitud" accordion="solicitud" role="tabpanel">
              <b-card-body class="overflow-auto">
                <json-view :data="solicitud" rootKey="solicitud" v-on:selected="addPathVariable" />
              </b-card-body>
            </b-collapse>
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-formatos variant="info">
                <b-icon icon="code"></b-icon>
                {{ $t('apeironGwApp.configCard.editor.code.variables.formatos') }}
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-formatos" accordion="formatos" role="tabpanel">
              <b-card-body class="overflow-auto">
                <b-badge
                  class="ml-2 selectable"
                  v-for="variable in variables"
                  :key="variable.name"
                  @click="addElement(variable)"
                  :variant="variable.type === 'function' ? 'info' : 'success'"
                  pill
                  >{{ variable.name }} {{ variable.type === 'function' ? '()' : '' }}</b-badge
                >
              </b-card-body>
            </b-collapse>
          </b-collapse>
        </div>
      </div>
      <div slot="modal-footer">
        <b-button variant="outline-danger" @click="handleCancel('codeEditorModal')">{{ $t('entity.action.cancel') }}</b-button>
        <b-button variant="primary" @click="handleConfirmation('codeEditorModal')">{{ $t('entity.action.confirm') }}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./dashboard.component.ts"></script>
