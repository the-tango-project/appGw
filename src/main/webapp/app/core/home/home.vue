<template>
  <div v-if="!authenticated" class="container">
    <b-img src="content/images/home/landscape.svg" fluid alt="Responsive image"></b-img>
  </div>
  <div v-else class="container">
    <b-row>
      <b-card
        v-for="item in resolveMenuItems()"
        :title="$t(item.titleKey)"
        :img-src="item.imgSrc"
        img-alt="Image"
        img-height="200"
        img-top
        footer-bg-variant="white"
        footer-border-variant="white"
        class="m-3 shadow rounded border-dark card-home"
      >
        <b-card-text>{{ $t(item.descriptionKey) }} </b-card-text>

        <template #footer>
          <router-link :to="{ name: item.toName }" custom v-slot="{ navigate }">
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
