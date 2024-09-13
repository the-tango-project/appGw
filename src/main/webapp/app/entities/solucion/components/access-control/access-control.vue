<template>
  <div v-if="solution">
    <b-row>
      <b-col>
        <b-form-group label="Filter" label-for="filter-input" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0">
          <b-input-group size="sm">
            <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col class="d-flex justify-content-end mb-3">
        <b-button class="mr-2" variant="primary" @click="prepareAddHandler">
          <b-icon icon="plus"></b-icon>
          <span>{{ $t('entity.action.add') }}</span>
        </b-button>
      </b-col>
    </b-row>

    <b-table :items="solution.autoridades" :fields="fields" show-empty :busy="busy" head-variant="dark" :filter="filter">
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>{{ $t('entity.action.loading') }}</strong>
        </div>
      </template>
      <template #empty="">
        <div class="h4 text-center">{{ $t('entity.info.no-data') }}</div>
      </template>
      <template #cell(roles)="row">
        <b-badge pill class="m-1" v-for="(rol, index) in row.item.roles" :key="index" variant="primary">
          {{ $t('apeironGwApp.RolAutoridad.' + rol) }}
        </b-badge>
      </template>
      <template #cell(acciones)="row">
        <core-button type="edit" size="sm" @click="prepareToEditHandler(row.item)" class="mr-2"></core-button>
        <core-button type="delete" size="sm" @click="prepareToDeleteHandler(row.item)"></core-button>
      </template>
    </b-table>

    <core-confirmation-modal ref="deleteAuthorityModal" @confirmed="deleteUserHandler">
      <authority-details v-model="autorityToEdit" no-roles></authority-details>
    </core-confirmation-modal>

    <core-confirmation-modal ref="addOrUpdateAuthorityModal" noquestion :disabled="!isAuthorityCorrect" @confirmed="addUserHandler">
      <div v-if="autorityToEdit">
        <b-form-group v-if="autorityToEdit && showSearcher" class="text-center" id="componente-add-autoridad" size="sm">
          <b-input-group class="mt-3">
            <b-form-input
              :disabled="isFetching"
              v-model.trim="loginToFind"
              :placeholder="$t('archeApp.solucion.seccion.autoridad.searchPlaceholder')"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="isFetching || !loginToFind" @click="findAuthorityHandler" variant="primary">
                <b-icon v-if="isFetching" icon="arrow-clockwise" animation="spin"></b-icon>
                <span v-else v-text="$t('entity.action.search')"></span>
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <b-alert class="mt-3" variant="warning" :show="userNotFound"
            >{{ $t('entity.info.not-found') }} <strong>{{ loginToFind }}</strong></b-alert
          >
          <b-alert class="mt-3" variant="warning" :show="userAlreadyInList">
            <p v-html="$t('register.messages.error.userexists')"></p>
            <strong>{{ autorityToEdit.login }}</strong></b-alert
          >
        </b-form-group>

        <authority-details v-if="autorityToEdit.usuarioId" v-model="autorityToEdit"></authority-details>
      </div>
    </core-confirmation-modal>
  </div>
</template>

<script lang="ts" src="./access-control.component.ts"></script>
