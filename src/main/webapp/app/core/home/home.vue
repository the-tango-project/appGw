<template>
  <div v-if="!authenticated" class="container">
    <b-img src="content/images/home/landscape.svg" fluid alt="Responsive image"></b-img>
  </div>
  <div v-else class="container">
    <b-row>
      <b-card
        title="Mis soluciones"
        tag="article"
        img-src="content/images/home/flow.svg"
        img-alt="Image"
        img-height="200"
        img-top
        footer-bg-variant="white"
        footer-border-variant="white"
        class="m-3 shadow rounded border-dark card-home"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.up the bulk of the card's content.up
          the bulk of the card's content.up the bulk of the card's content.
        </b-card-text>

        <template #footer>
          <router-link :to="{ name: 'Solucion' }" custom v-slot="{ navigate }">
            <button @click="navigate" class="btn btn-primary jh-create-entity create-solucion">
              <span v-text="$t('entity.action.manage')"></span>
            </button>
          </router-link>
        </template>
      </b-card>
      <b-card
        title="Mis formularios"
        tag="article"
        img-src="content/images/home/add.svg"
        img-alt="Image"
        img-height="200"
        img-top
        footer-bg-variant="white"
        footer-border-variant="white"
        class="m-3 shadow rounded border-dark card-home"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.up the bulk of the card's content.up
          the bulk of the card's content.up the bulk of the card's content.
        </b-card-text>

        <template #footer>
          <router-link :to="{ name: 'Form' }" custom v-slot="{ navigate }">
            <button @click="navigate" class="btn btn-primary jh-create-entity create-solucion">
              <span v-text="$t('entity.action.manage')"></span>
            </button>
          </router-link>
        </template>
      </b-card>
      <b-card
        title="Gestión de usuarios"
        tag="article"
        img-src="content/images/home/manage.svg"
        img-alt="Image"
        img-height="200"
        img-top
        footer-bg-variant="white"
        footer-border-variant="white"
        class="m-3 shadow rounded border-dark card-home"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.up the bulk of the card's content.up
          the bulk of the card's content.up the bulk of the card's content.
        </b-card-text>

        <template #footer>
          <router-link :to="{ name: 'JhiUser' }" custom v-slot="{ navigate }">
            <button @click="navigate" class="btn btn-primary jh-create-entity create-solucion">
              <span v-text="$t('entity.action.manage')"></span>
            </button>
          </router-link>
        </template>
      </b-card>
    </b-row>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
<style lang="scss" scoped>
.card-home {
  max-width: 20rem;
}
</style>
