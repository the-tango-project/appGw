<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="demoPaginate">
        <h2 class="jh-entity-heading" data-cy="demoPaginateDetailsHeading">
          <span v-text="t$('appGwApp.flowMsDemoPaginate.detail.title')"></span> {{ demoPaginate.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.name')"></span>
          </dt>
          <dd>
            <span>{{ demoPaginate.name }}</span>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.creationDate')"></span>
          </dt>
          <dd>
            <span v-if="demoPaginate.creationDate">{{ formatDateLong(demoPaginate.creationDate) }}</span>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.age')"></span>
          </dt>
          <dd>
            <span>{{ demoPaginate.age }}</span>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.price')"></span>
          </dt>
          <dd>
            <span>{{ demoPaginate.price }}</span>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.active')"></span>
          </dt>
          <dd>
            <span>{{ demoPaginate.active }}</span>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.ima')"></span>
          </dt>
          <dd>
            <div v-if="demoPaginate.ima">
              <a v-on:click="openFile(demoPaginate.imaContentType, demoPaginate.ima)" v-text="t$('entity.action.open')"></a>
              {{ demoPaginate.imaContentType }}, {{ byteSize(demoPaginate.ima) }}
            </div>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.dataAnyBlob')"></span>
          </dt>
          <dd>
            <div v-if="demoPaginate.dataAnyBlob">
              <a v-on:click="openFile(demoPaginate.dataAnyBlobContentType, demoPaginate.dataAnyBlob)" v-text="t$('entity.action.open')"></a>
              {{ demoPaginate.dataAnyBlobContentType }}, {{ byteSize(demoPaginate.dataAnyBlob) }}
            </div>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.photo')"></span>
          </dt>
          <dd>
            <div v-if="demoPaginate.photo">
              <a v-on:click="openFile(demoPaginate.photoContentType, demoPaginate.photo)">
                <img
                  v-bind:src="'data:' + demoPaginate.photoContentType + ';base64,' + demoPaginate.photo"
                  style="max-width: 100%"
                  alt="demoPaginate"
                />
              </a>
              {{ demoPaginate.photoContentType }}, {{ byteSize(demoPaginate.photo) }}
            </div>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.description')"></span>
          </dt>
          <dd>
            <span>{{ demoPaginate.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('appGwApp.flowMsDemoPaginate.dataEnum')"></span>
          </dt>
          <dd>
            <span v-text="t$('appGwApp.Language.' + demoPaginate.dataEnum)"></span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="demoPaginate.id"
          :to="{ name: 'DemoPaginateEdit', params: { demoPaginateId: demoPaginate.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./demo-paginate-details.component.ts"></script>
