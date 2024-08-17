<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <h2 id="page-heading" data-cy="FormHeading">
        <span v-text="$t('form.home.titleUpdate')" id="form-heading"></span>
        <div class="d-flex justify-content-end">
          <b-button size="sm" class="m-2" v-if="form.id" @click="handleClone()" variant="outline-success">
            <b-icon icon="subtract"></b-icon>
            <span v-text="$t('entity.action.clone')"></span>
          </b-button>
          <b-button size="sm" class="m-2" :disabled="isSaving" variant="success" @click="handleExport()">
            <b-icon icon="arrow-bar-down"></b-icon>
            <span>{{ $t('entity.action.export') }}</span>
          </b-button>
          <a href download ref="dummyDownloadLink" v-show="false"></a>
          <b-button size="sm" class="m-2" :disabled="isSaving" variant="outline-success" @click="handleOpenImportModal()">
            <b-icon icon="arrow-bar-up"></b-icon>
            <span>{{ $t('entity.action.import') }}</span>
          </b-button>
        </div>
      </h2>
      <!--  Form submit -->
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <b-tabs fill v-model="tabIndex" @input="handleActivatedTab">
          <b-tab class="mt-4" :title-link-class="linkClass(0)">
            <template #title> <b-icon :icon="resolveIcon('info-square', 0)"></b-icon> {{ $t('form.main-data.title') }} </template>
            <b-card>
              <b-row>
                <b-col sm="12" md="12" lg="6">
                  <core-input-text v-if="form.id" :label="$t('global.field.id')" v-model="form.id" readonly></core-input-text>
                  <core-input-text :label="$t('form.main-data.title-component')" v-model="v$.title.$model"></core-input-text>
                  <core-select-one
                    :label="$t('form.main-data.menuName')"
                    v-model="v$.menuName.$model"
                    :options="tipoMenuOptions"
                  ></core-select-one>
                  <core-input-text :label="$t('form.main-data.description')" v-model="v$.description.$model"></core-input-text>
                  <core-input-text :label="$t('form.main-data.name')" v-model="v$.name.$model"></core-input-text>
                  <core-input-text :label="$t('form.main-data.path')" v-model="v$.path.$model"></core-input-text>
                </b-col>
                <b-col sm="12" md="12" lg="6">
                  <core-input-text :label="$t('form.main-data.type')" v-model="v$.type.$model"></core-input-text>
                  <core-input-text :label="$t('form.main-data.display')" v-model="v$.display.$model"></core-input-text>
                  <core-input-tags :label="$t('form.main-data.tags')" v-model="form.tags"></core-input-tags>
                  <core-input-text :label="$t('form.main-data.owner')" v-model="v$.owner.$model"></core-input-text>
                  <core-input-text :label="$t('form.main-data.machineName')" v-model="v$.machineName.$model"></core-input-text>
                  <core-select-one
                    :label="$t('form.main-data.tipo')"
                    v-model="v$.tipo.$model"
                    :options="tipoComponentOptions"
                    :description="$t('')"
                  ></core-select-one>
                  <core-icon-picker :label="$t('form.main-data.icon')" v-model="v$.icon.$model"> </core-icon-picker>
                </b-col>
              </b-row>
            </b-card>
          </b-tab>
          <b-tab id="tab-form-vuejs" v-if="form.tipo === 'VUEJS'" class="mt-4" :title-link-class="linkClass(1)">
            <template #title> <b-icon :icon="resolveIcon('grid1x2', 1)"></b-icon> VUEJS </template>
            <b-card>
              <message :description="$t('form.detail.instruccions')" variant="info"></message>

              <h3>Cod editor Vue3</h3>
              <core-code-editor v-model="form.vuejs" lang="text/x-vue"></core-code-editor>
            </b-card>
          </b-tab>
        </b-tabs>
        <div class="mb-5 mt-5 float-right">
          <div class="d-flex justify-content-end">
            <b-button class="mr-1" @click="previousState()" variant="outline-danger">
              <span v-text="$t('global.navigation.return')"></span>
              <b-icon icon="arrow-return-left"></b-icon>
            </b-button>
            <b-button class="mr-1" v-if="isImporting" @click="createForm()" :disabled="v$.$invalid || isSaving" variant="primary">
              <span> Guardar importado</span>
              <b-icon icon="save"></b-icon>
            </b-button>
            <b-button v-else @click="save()" :disabled="v$.$invalid || isSaving" variant="primary">
              <span v-text="$t('entity.action.save')"></span>
              <b-icon icon="save"></b-icon>
            </b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./form.update.component.ts"></script>
