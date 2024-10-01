<template>
  <div>
    <b-row>
      <b-col sm="12" md="12" lg="6">
        <b-input-group size="sm">
          <b-form-input
            id="filter-rule-input"
            v-model="filter"
            autocomplete="off"
            :placeholder="$t('apeironGwApp.transicion.businessRules.search')"
          ></b-form-input>

          <b-input-group-append>
            <b-icon
              v-if="filter"
              class="i-selected ml-2"
              icon="x-circle"
              variant="primary"
              font-scale="1.5"
              @click="filter = null"
            ></b-icon>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col class="text-right mt-1" sm="12" md="12" lg="6">
        <b-icon icon="check2-square" variant="secondary" font-scale="1.2"></b-icon>
        <span class="text-muted" v-html="$t('global.tables.selected-items', { count: totalSelectedRows })"></span>
      </b-col>
    </b-row>
    <b-table
      class="text-nowrap mt-3"
      responsive
      borderless
      small
      :current-page="currentPage"
      :per-page="perPage"
      :items="items"
      :fields="customFields"
      :filter="filter"
      @filtered="onFiltered"
      :tbody-tr-class="rowClass"
    >
      <template #head(#)>&#x200b;</template>
      <template #head(acciones)>&#x200b;</template>
      <template #cell(clave)="row">
        <del class="text-danger" v-if="row.item.deprecated">{{ row.item.clave }}</del>
        <span v-else> {{ row.item.clave }} </span>
      </template>
      <template #cell(tags)="row">
        <span v-for="tag in row.item.tags" v-bind:key="tag">
          <b-badge class="mr-1" v-if="tag" pill variant="primary">{{ tag }} </b-badge>
        </span>
      </template>
      <template #cell(#)="row">
        <div v-if="isRowSelected(row.item)">
          <b-icon class="i-selected" icon="check-square" variant="primary" font-scale="1.2" @click="handleRemoveComponente(row)"></b-icon>
          <b-icon
            v-if="hasArguments(row)"
            class="i-selected ml-2"
            variant="primary"
            font-scale="1.2"
            icon="gear"
            @click="openConfigurarComponente(row)"
          >
          </b-icon>
        </div>
        <b-icon v-else class="i-selected" variant="primary" font-scale="1.2" icon="square" @click="handleAddComponente(row)"></b-icon>
      </template>
      <template #row-details>
        <b-card>
          <div v-if="currentRowSelected">
            <arguments-config @update="handleUpdateArguments" :transition-element="currentRowSelected"></arguments-config>
          </div>
        </b-card>
      </template>
      <template #cell(acciones)="row">
        <div class="text-left">
          <div v-if="isRowSelected(row.item)">
            <b-icon class="mr-2" variant="primary" font-scale="1.2" icon="gear" @click="openConfigurarComponente(row)"> </b-icon>
          </div>
        </div> </template
    ></b-table>
    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" size="sm" pills></b-pagination>
  </div>
</template>

<script lang="ts" src="./select-transition-elements.component.ts"></script>
