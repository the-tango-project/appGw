<template>
  <div>
    <h2 id="page-heading" data-cy="DemoPaginateHeading">
      <span v-text="t$('appGwApp.flowMsDemoPaginate.home.title')" id="demo-paginate-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('appGwApp.flowMsDemoPaginate.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'DemoPaginateCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-demo-paginate"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && demoPaginates && demoPaginates.length === 0">
      <span v-text="t$('appGwApp.flowMsDemoPaginate.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="demoPaginates && demoPaginates.length > 0">
      <table class="table table-striped" aria-describedby="demoPaginates">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="t$('global.field.id')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.name')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('creationDate')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.creationDate')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'creationDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('age')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.age')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'age'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('price')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.price')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'price'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('active')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.active')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'active'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('ima')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.ima')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'ima'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('dataAnyBlob')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.dataAnyBlob')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dataAnyBlob'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.photo')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('description')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.description')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('dataEnum')">
              <span v-text="t$('appGwApp.flowMsDemoPaginate.dataEnum')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dataEnum'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="demoPaginate in demoPaginates" :key="demoPaginate.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'DemoPaginateView', params: { demoPaginateId: demoPaginate.id } }">{{
                demoPaginate.id
              }}</router-link>
            </td>
            <td>{{ demoPaginate.name }}</td>
            <td>{{ formatDateShort(demoPaginate.creationDate) || '' }}</td>
            <td>{{ demoPaginate.age }}</td>
            <td>{{ demoPaginate.price }}</td>
            <td>{{ demoPaginate.active }}</td>
            <td>
              <a
                v-if="demoPaginate.ima"
                v-on:click="openFile(demoPaginate.imaContentType, demoPaginate.ima)"
                v-text="t$('entity.action.open')"
              ></a>
              <span v-if="demoPaginate.ima">{{ demoPaginate.imaContentType }}, {{ byteSize(demoPaginate.ima) }}</span>
            </td>
            <td>
              <a
                v-if="demoPaginate.dataAnyBlob"
                v-on:click="openFile(demoPaginate.dataAnyBlobContentType, demoPaginate.dataAnyBlob)"
                v-text="t$('entity.action.open')"
              ></a>
              <span v-if="demoPaginate.dataAnyBlob"
                >{{ demoPaginate.dataAnyBlobContentType }}, {{ byteSize(demoPaginate.dataAnyBlob) }}</span
              >
            </td>
            <td>
              <a v-if="demoPaginate.photo" v-on:click="openFile(demoPaginate.photoContentType, demoPaginate.photo)">
                <img
                  v-bind:src="'data:' + demoPaginate.photoContentType + ';base64,' + demoPaginate.photo"
                  style="max-height: 30px"
                  alt="demoPaginate"
                />
              </a>
              <span v-if="demoPaginate.photo">{{ demoPaginate.photoContentType }}, {{ byteSize(demoPaginate.photo) }}</span>
            </td>
            <td>{{ demoPaginate.description }}</td>
            <td v-text="t$('appGwApp.Language.' + demoPaginate.dataEnum)"></td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'DemoPaginateView', params: { demoPaginateId: demoPaginate.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'DemoPaginateEdit', params: { demoPaginateId: demoPaginate.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(demoPaginate)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <span ref="infiniteScrollEl"></span>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span
          id="appGwApp.flowMsDemoPaginate.delete.question"
          data-cy="demoPaginateDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-demoPaginate-heading" v-text="t$('appGwApp.flowMsDemoPaginate.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-demoPaginate"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeDemoPaginate()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./demo-paginate.component.ts"></script>
