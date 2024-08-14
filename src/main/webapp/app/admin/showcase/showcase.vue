<template>
  <div>
    <header class="bx-header-title">
      <h3>{{ $t('showcase.card-list.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <core-card-list :items="items"></core-card-list>

    <header class="bx-header-title">
      <h3>{{ $t('showcase.modal.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <b-button class="mr-3" @click="showModal('simpleConfirmModal')" variant="outline-primary">
      {{ $t('showcase.modal.show', { name: 'simpleConfirmModal' }) }}
    </b-button>
    <b-button @click="showModal('confirmWithMessageModal')" variant="outline-primary">
      {{ $t('showcase.modal.show', { name: 'confirmWithMessageModal' }) }}
    </b-button>
    <p v-if="modalResult" :class="modalResult === 'canceled' ? 'text-warning' : 'text-primary'">{{ modalResult }}</p>
    <p v-if="modalResultComment">{{ modalResultComment }}</p>
    <core-confirmation-modal ref="simpleConfirmModal" @confirmed="confirmedHandler" @canceled="canceledHandler" />
    <core-confirmation-modal
      ref="confirmWithMessageModal"
      :addComentario="true"
      :check="true"
      @confirmed="confirmedHandler"
      @canceled="canceledHandler"
    />

    <header class="bx-header-title">
      <h3>{{ $t('showcase.empty-content.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <core-empty-content></core-empty-content>

    <header class="bx-header-title">
      <h3>{{ $t('showcase.empty-content.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <core-flow></core-flow>
  </div>
</template>

<script lang="ts" src="./showcase.component.ts"></script>
