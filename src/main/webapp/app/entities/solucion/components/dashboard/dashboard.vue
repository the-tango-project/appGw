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
                <core-button @click="openCodeEditorModal(index)" class="mr-2" type="edit" notext> </core-button>
                <core-button @click="handleDelete(index)" class="mr-2" type="delete" notext> </core-button>
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
            <b-button @click="openPermisosPerColumnEditorModal(index)" class="border-0" size="sm" variant="white" pill>
              <b-avatar
                :icon="column?.roles?.length > 0 ? 'people-fill' : 'people'"
                :badge="column?.roles?.length.toString()"
                variant="light"
                badge-variant="light"
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
            <b-button class="shadow d-inline-block border-0" variant="outline-primary" size="sm" @click="handleOpenConfigEstadoModal">
              <b-icon icon="mask"></b-icon>
              {{ $t('archeApp.solucion.seccion.dashboard.estados.mascara.title') }}</b-button
            >
          </b-td>
          <b-td>
            <edit-buttons v-model="solution.vistaResumen.buttons"></edit-buttons>
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

    <!-- ************************ -->
    <!-- MODAL: EDIT COLUMN       -->
    <!-- ************************ -->
    <core-base-modal ref="codeEditorModal" @confirmed="handleConfirmation('codeEditorModal')" @canceled="handleCancel('codeEditorModal')">
      <edit-column v-if="columnSelected" v-model="columnSelected" :solution="solution" :solicitud="solicitud"></edit-column>
    </core-base-modal>

    <!-- ************************ -->
    <!-- MODAL: Cancel OPERATION  -->
    <!-- ************************ -->
    <core-confirmation-modal ref="removeElementModal" @confirmed="deleteColumnHandler"></core-confirmation-modal>

    <!-- ************************ -->
    <!-- MODAL: EDIT ROLES        -->
    <!-- ************************ -->
    <core-base-modal
      ref="permisosPerColumnEditorModal"
      @confirmed="handleConfirmation('permisosPerColumnEditorModal')"
      @canceled="handleCancel('permisosPerColumnEditorModal')"
    >
      <edit-column v-if="columnSelected" v-model="columnSelected" :solution="solution" :solicitud="solicitud"></edit-column>
    </core-base-modal>

    <!-- ************************ -->
    <!-- MODAL: EDIT MASK         -->
    <!-- ************************ -->
    <core-base-modal :title="$t('archeApp.solucion.seccion.dashboard.estados.mascara.title')" ref="configEstadoModal" :actions="['close']">
      <edit-mask v-model="solution.vistaResumen.mascaraEstados"></edit-mask>
    </core-base-modal>
  </div>
</template>

<script lang="ts" src="./dashboard.component.ts"></script>
