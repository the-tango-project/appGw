<template>
  <div>
    <div v-if="items && items.length > 0" class="form-group">
      <h3 class="m-h3" v-if="title">{{ title }}</h3>
      <b-card
        v-for="item in items"
        v-bind:key="item.id"
        class="mb-4 shadow rounded border-dark"
        :bg-variant="isEditable(item) ? '' : 'light'"
      >
        <b-row>
          <b-col col lg="1" class="center-felx card-contacto">
            <b-icon variant="secondary" :icon="item.icon" font-scale="3"></b-icon>
          </b-col>
          <b-col col lg="7" class="left-felx">
            <b-card-text>
              <div class="font-weight-bolder text-primary h4">{{ item.title }}</div>
              <div v-if="item.description" v-html="item.description"></div>
              <div v-if="item.solicitante">
                <div class="mt-2">{{ $t('item-detail.author') }}</div>
                <div>
                  <strong>{{ item.solicitante }}</strong>
                </div>
              </div>
              <div v-for="(desc, index) in item.columns" :key="index">
                <div v-if="desc.hasAccess && desc.show" class="mt-2">
                  {{ desc.title }}
                </div>
                <div v-if="desc.hasAccess && desc.show">
                  <strong>{{ desc.description }}</strong>
                </div>
              </div>
              <div v-if="item.footer" class="text-muted" style="white-space: pre-line" v-html="item.footer"></div>
            </b-card-text>
          </b-col>
          <b-col col lg="4">
            <b-row class="d-flex justify-content-end mb-3">
              <span v-for="b in item.badge" v-bind:key="b.id">
                <b-badge class="ml-1" v-if="b.name" pill :variant="b.variant ? b.variant : 'light'">{{ b.name }} </b-badge>
              </span>
            </b-row>
            <b-row class="d-flex text-center justify-content-end">
              <div class="btn-group float-right" v-if="isCardFooterVisible(item)">
                <router-link class="mr-2" v-for="(button, index) in item.buttons" :key="index" :to="button.to" custom v-slot="{ navigate }">
                  <b-button v-b-tooltip.top :title="button.tooltip ? button.tooltip : ''" @click="navigate" variant="outline-primary">
                    <span class="d-none d-md-inline">{{ button.name }}</span>
                    <span :class="button.icon"></span>
                  </b-button>
                </router-link>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
      <slot></slot>
    </div>
    <div v-else>
      <core-empty-content></core-empty-content>
    </div>
  </div>
</template>
<script lang="ts" src="./card-list.component.ts"></script>
<style lang="scss" scoped>
.card-contacto {
  span {
    font-size: 3.1rem !important;
  }
}
</style>
