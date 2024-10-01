<template>
  <div>
    <div v-if="notificacion.activada">
      <b-form-group>
        <b-form-checkbox v-model="notificacion.activada" name="activar-notificacion" size="lg" switch>
          {{ notificacion.activada ? 'Desactivar notificación' : 'Activar notificación' }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group label-cols="2" label-cols-lg="1" :label="$t('apeironGwApp.transicion.notificacion.para')">
        <core-input-tags
          id="notificacion-activada-id"
          v-model="notificacion.para"
          variant="primary"
          :placeholder="$t('apeironGwApp.transicion.notificacion.placeholder.para')"
          size="md"
          :disabled="!notificacion.activada"
        />
        <b-button
          class="ml-2 mt-3"
          variant="outline-success"
          size="sm"
          v-for="(variable, index) in variableCorreos"
          :key="index"
          @click="addCorreoToPara(variable)"
        >
          {{ variable.nombre }}
        </b-button>
      </b-form-group>
      <b-form-group label-cols="2" label-cols-lg="1" :label="$t('apeironGwApp.transicion.notificacion.cc')">
        <core-input-tags
          id="notificacion-cc-id"
          v-model="notificacion.cc"
          variant="primary"
          :placeholder="$t('apeironGwApp.transicion.notificacion.placeholder.cc')"
          size="md"
          :disabled="!notificacion.activada"
        />
        <b-button
          class="ml-2 mt-3"
          variant="outline-success"
          size="sm"
          v-for="(variable, index) in variableCorreos"
          :key="index"
          @click="addCorreoToCc(variable)"
        >
          {{ variable.nombre }}
        </b-button>
      </b-form-group>
      <b-form-group label-cols="2" label-cols-lg="1" :label="$t('apeironGwApp.transicion.notificacion.cco')">
        <core-input-tags
          id="notificacion-cco-id"
          v-model="notificacion.cco"
          variant="primary"
          :placeholder="$t('apeironGwApp.transicion.notificacion.placeholder.cco')"
          size="md"
          :disabled="!notificacion.activada"
        />
        <b-button
          class="ml-2 mt-3"
          variant="outline-success"
          size="sm"
          v-for="(variable, index) in variableCorreos"
          :key="index"
          @click="addCorreoToCco(variable)"
        >
          {{ variable.nombre }}
        </b-button>
      </b-form-group>
      <b-form-group label-cols="2" label-cols-lg="1" :label="$t('apeironGwApp.transicion.notificacion.asunto')">
        <b-form-input v-model="notificacion.asunto" size="md" :disabled="!notificacion.activada"></b-form-input>
      </b-form-group>
      <core-text-editor id="mensaje-notificacion" ref="mensajeNotificacion" v-model="notificacion.mensaje"></core-text-editor>
      <b-button
        class="ml-2 mt-3"
        variant="outline-success"
        size="sm"
        v-for="(variable, index) in variables"
        :key="index"
        @click="addVariable(variable)"
      >
        {{ variable.nombre }}
      </b-button>
    </div>
    <core-empty-content
      v-else
      :message="$t('global.messages.info.notificacionNotActivated')"
      :hint="$t('global.messages.info.activate')"
      icon="bell"
      @add="notificacion.activada = true"
    ></core-empty-content>
  </div>
</template>

<script lang="ts" src="./notification-config.component.ts"></script>
