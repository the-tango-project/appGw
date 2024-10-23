<template>
  <b-container fluid>
    <b-row class="text-center" v-if="transition">
      <b-col cols="5">
        <select-action v-model="transition.accion"></select-action>
      </b-col>
      <b-col cols="2">
        <b-icon class="align-middle mt-4" icon="arrow-bar-right" font-scale="3"></b-icon>
      </b-col>
      <b-col cols="5">
        <select-state v-model="transition.destino"></select-state>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="transition">
        <core-accordion :title="$t('apeironGwApp.transicion.message.confirm')" icon="chat-left">
          <b-form-checkbox v-model="transition.confirmar" name="requiere-confirmacion" switch>
            {{ $t('apeironGwApp.transicion.message.dobleCheckQuestion') }}
          </b-form-checkbox>
          <b-form-checkbox v-model="transition.agregarComentario" name="requiere-agregar-comentario" switch>
            {{ $t('apeironGwApp.transicion.message.addMessageQuestion') }}
          </b-form-checkbox>
          <br />
          <b-form-group id="componente-add-mensaje" size="sm" label="Mensaje de confirmación" label-for="mensaje-confirmacion">
            <core-text-editor id="mensaje-confirmacion" v-model="transition.mensaje"></core-text-editor>
          </b-form-group>
        </core-accordion>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="transition">
        <core-accordion :title="$t('apeironGwApp.transicion.businessRules.title')" icon="list-task">
          <select-transition-elements
            class="mt-3"
            id="reglas-id"
            v-model="transition.reglas"
            :items="reglas"
            add-tags-column
            add-condition-column
          ></select-transition-elements>
        </core-accordion>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="transition">
        <core-accordion :title="$t('apeironGwApp.transicion.actions.title')" icon="lightning">
          <select-transition-elements
            class="mt-3"
            id="acciones-id"
            v-model="transition.acciones"
            :items="actions"
          ></select-transition-elements>
        </core-accordion>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="transition?.notificacion">
        <core-accordion :title="$t('apeironGwApp.transicion.notificacion.title')" icon="envelope">
          <notification-config v-model="transition.notificacion"></notification-config>
        </core-accordion>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="transition">
        <core-accordion :title="$t('entity.action.delete')" icon="trash" variant="outline-danger">
          <core-message variant="warning">
            <div class="row">
              <div class="col-0">
                <b-form-checkbox class="ml-3" size="lg" v-model="deleteConfirmation"> </b-form-checkbox>
              </div>
              <div class="col-11">
                <p class="ml-1">
                  {{ $t('archeApp.solucion.process.transition.messages.delete-warning') }}
                </p>
              </div>
            </div>
          </core-message>
          <div class="row">
            <div class="col text-center">
              <core-button v-if="deleteConfirmation" type="delete" @click="deleteTransitionHandle"></core-button>
            </div>
          </div>
        </core-accordion>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" src="./edit-transition.component.ts"></script>
<style lang="scss" scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
