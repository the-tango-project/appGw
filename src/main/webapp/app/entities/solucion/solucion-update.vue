<template>
  <div>
    <!--  Form submit -->
    <div v-if="solucion.proceso">
      {{ solucion.proceso }}
    </div>
    <b-tabs fill v-model="tabIndex" @input="handleActivatedTab">
      <b-tab class="mt-4" :title-link-class="linkClass(0)">
        <template #title> <b-icon :icon="resolveIcon('info-square', 0)"></b-icon> {{ $t('form.main-data.title') }} </template>
        <b-card>
          <div v-if="solucion.proceso?.estados?.length != undefined">
            <core-flow v-model="solucion.proceso"></core-flow>
          </div>
        </b-card>
      </b-tab>
    </b-tabs>
    <div class="mb-5 mt-5 float-right">
      <div class="d-flex justify-content-end">
        <b-button class="mr-1" @click="previousState()" variant="outline-danger">
          <span v-text="$t('global.navigation.return')"></span>
          <b-icon icon="arrow-return-left"></b-icon>
        </b-button>
        <b-button class="mr-1" v-if="isImporting" @click="createForm()" :disabled="v$.$invalid || isSaving" variant="primary">
          <span> Guardar importado</span>
          <b-icon icon="save"></b-icon>
        </b-button>
        <b-button v-else @click="save()" :disabled="v$.$invalid || isSaving" variant="primary">
          <span v-text="$t('entity.action.save')"></span>
          <b-icon icon="save"></b-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./solucion-update.component.ts"></script>
