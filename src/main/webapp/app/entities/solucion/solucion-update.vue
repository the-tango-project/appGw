<template>
  <div>
    {{ transitionWrapperToEdit }}
    <b-row>
      <b-col>
        <version v-if="solucion" :archive="isArchivada" :version="solucion.version" :mensaje="solucion.mensajePublicacion"></version>
      </b-col>
      <b-col>
        <div class="float-right">
          <div class="d-flex justify-content-end">
            <core-button type="import" @click="previousState()" notext></core-button>
            <core-button type="export" @click="createForm()" notext></core-button>
            <core-button type="return" @click="previousState()" notext></core-button>
            <core-button v-if="isImporting" type="save" @click="createForm()" notext></core-button>
            <core-button v-else type="save" @click="save()" notext></core-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <core-tabs-skeleton v-show="isFetching"></core-tabs-skeleton>
    <div v-show="!isFetching" v-if="solucion.proceso?.estados?.length != undefined">
      <b-tabs v-model="tabIndex">
        <b-tab :title-link-class="linkClass(0)">
          <template #title>
            <b-icon :icon="resolveIcon('diagram3', 0)"></b-icon> {{ $t('archeApp.solucion.seccion.proceso.title') }}
          </template>
          <core-flow
            ref="coreFlow"
            v-model="solucion.proceso"
            @update:node="updateNodeHandler"
            @update:edge="updateEdgeHandler"
          ></core-flow>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" :title-link-class="linkClass(1)">
          <template #title>
            <b-icon :icon="resolveIcon('info-circle', 1)"></b-icon> {{ $t('archeApp.solucion.seccion.general-data.title') }}</template
          >
          <b-card class="shadow border-dark">
            <general-data v-model="solucion"></general-data>
          </b-card>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" class="mt-4" :title-link-class="linkClass(2)">
          <template #title>
            <b-icon :icon="resolveIcon('chat-text', 2)"></b-icon> {{ $t('archeApp.solucion.seccion.mensaje.title') }}
          </template>
          <b-card class="shadow border-dark">
            <messages v-model="solucion"></messages>
          </b-card>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" id="tab-parametros-id" class="mt-4" :title-link-class="linkClass(3)">
          <template #title>
            <b-icon :icon="resolveIcon('gear', 3)"></b-icon> {{ $t('archeApp.solucion.seccion.parametros.config') }}
          </template>
          <b-card class="shadow border-dark">
            <configuration v-model="solucion"></configuration>
          </b-card>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" id="tab-componentes-id" class="mt-4" :title-link-class="linkClass(4)">
          <template #title>
            <b-icon :icon="resolveIcon('puzzle', 4)"></b-icon> {{ $t('archeApp.solucion.seccion.formularios.title') }}
          </template>
          <b-card class="shadow border-dark">
            <forms v-model="solucion"></forms>
          </b-card>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" id="tab-correo-id" class="mt-4" :title-link-class="linkClass(5)">
          <template #title>
            <b-icon :icon="resolveIcon('envelope', 5)"></b-icon> {{ $t('archeApp.solucion.seccion.correo.title') }}
          </template>
          <b-card class="shadow border-dark">
            <email-template v-model="solucion"></email-template>
          </b-card>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" id="tab-card-info-id" class="mt-4" :title-link-class="linkClass(6)">
          <template #title>
            <b-icon :icon="resolveIcon('table', 6)"></b-icon> {{ $t('archeApp.solucion.seccion.dashboard.title') }}
          </template>
          <b-card class="shadow border-dark">
            <dashboard v-model="solucion"></dashboard>
          </b-card>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" id="tab-autoridades-id" class="mt-4" :title-link-class="linkClass(7)">
          <template #title>
            <b-icon :icon="resolveIcon('person-plus', 7)"></b-icon> {{ $t('archeApp.solucion.seccion.autoridad.title') }}
          </template>
          <b-card class="shadow border-dark">
            <access-control v-model="solucion"></access-control>
          </b-card>
        </b-tab>
        <b-tab v-if="!isNavbarOpen" class="mt-4" :title-link-class="linkClass(8)">
          <template #title>
            <b-icon :icon="resolveIcon('tags', 8)"></b-icon> {{ $t('archeApp.solucion.seccion.versiones.title') }}</template
          >
          <b-card class="shadow border-dark">
            <change-control :new="solucion" :old="currentPublishedSolution"></change-control>
          </b-card>
        </b-tab>
      </b-tabs>
      <core-base-modal ref="editEdgeModal" @confirmed="updateTransitionHandler">
        <edit-transition
          v-if="transitionWrapperToEdit"
          v-model="transitionWrapperToEdit.transition"
          @delete="deleteTransitionHandle(transitionWrapperToEdit)"
        ></edit-transition>
      </core-base-modal>
    </div>
  </div>
</template>

<script lang="ts" src="./solucion-update.component.ts"></script>
