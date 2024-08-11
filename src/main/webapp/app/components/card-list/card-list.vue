<template>
  <div>
    <div v-if="items && items.length > 0" class="form-group">
      <h3 class="m-h3" v-if="title">{{ title }}</h3>
      <b-card v-for="item in items" v-bind:key="item.id" class="mb-4" :bg-variant="isEditable(item) ? '' : 'light'">
        <b-row>
          <b-col col lg="1" class="center-felx card-contacto">
            <span :class="item.icon"></span>
          </b-col>
          <ul class="felx-2">
            <b-col col lg="9" class="left-felx">
              <b-card-text>
                <router-link v-if="item.router" :to="item.router.edit.to" custom v-slot="{ navigate }">
                  <b-link @click="navigate">
                    <div class="font-weight-bolder text-rizoma h4">{{ item.title }}</div>
                  </b-link>
                </router-link>
                <router-link
                  v-else-if="hasEditableButtons(item)"
                  class="mr-2"
                  v-slot="{ navigate }"
                  custom
                  :to="findFirstEditableDestino(item)"
                >
                  <b-link @click="navigate">
                    <div class="font-weight-bolder text-rizoma h4">{{ item.title }}</div>
                  </b-link>
                </router-link>
                <div v-else class="font-weight-bolder text-black h4">{{ item.title }}</div>
                <div v-if="item.description" v-html="item.description"></div>
                <div v-if="item.solicitante">
                  <div class="mt-2">{{ $t('apeironGwApp.tableView.solicitante') }}</div>
                  <div>
                    <strong>{{ item.solicitante }}</strong>
                  </div>
                </div>
                <div v-for="(desc, index) in item.columnas" :key="index">
                  <div v-if="desc.hasAccess && desc.show" class="mt-2">
                    {{ desc.title }}
                  </div>
                  <div v-if="desc.hasAccess && desc.show">
                    <strong>{{ desc.description }}</strong>
                  </div>
                </div>
                <div v-if="item.pieDePagina" class="text-muted" style="white-space: pre-line" v-html="item.pieDePagina"></div>
              </b-card-text>
            </b-col>
            <b-col col lg="2" class="right-felx">
              <span class="rt-1" v-for="b in item.badge" v-bind:key="b.id">
                <b-badge v-if="b.badge" pill :variant="b.variant ? b.variant : 'light'">{{ b.badge }} </b-badge>
              </span>
            </b-col>
          </ul>
        </b-row>
        <b-row class="boder-top" v-if="isCardFooterVisible(item)">
          <b-col col cols="12">
            <div class="btn-group float-right">
              <router-link
                class="mr-2"
                v-for="(button, index) in item.buttons"
                :key="index"
                :to="button.destino"
                custom
                v-slot="{ navigate }"
              >
                <b-button @click="navigate" variant="outline-primary">
                  <span class="d-none d-md-inline">{{ button.nombre }}</span>
                  <span :class="'icon-' + button.icon"></span>
                </b-button>
              </router-link>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <c-delete-modal :id="id + 'removeEntity'" @onDelete="remove()" />
      <slot></slot>
    </div>
    <div v-else>
      <core-empty-content></core-empty-content>
    </div>
  </div>
</template>
<script lang="ts" src="./card-list.migrate.component.ts"></script>
