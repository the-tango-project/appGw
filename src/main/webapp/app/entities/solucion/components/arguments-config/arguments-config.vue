<template>
  <div class="p-5">
    <core-message
      class="mb-3"
      :description="$t('apeironGwApp.transicion.arguments.hint', { nombre: transitionElement.nombre })"
      variant="info"
    ></core-message>
    <div v-for="(argumento, index) in argumentos" :key="index">
      <b-form-group v-if="argumento.type === ArgumentType.STRING" :label="argumento.name">
        <b-form-input class="w-50" v-model="argumento.value" @change="changeValueHandle"></b-form-input>
      </b-form-group>
      <b-form-group v-else-if="argumento.type === ArgumentType.INTEGER || argumento.type === ArgumentType.FLOAT" :label="argumento.name">
        <b-form-input class="w-50" type="number" v-model="argumento.value" @change="changeValueHandle"></b-form-input>
      </b-form-group>
      <b-form-group v-else-if="argumento.type === ArgumentType.DATE" :label="argumento.name">
        <b-form-input class="w-50" type="date" v-model="argumento.value" @change="changeValueHandle"></b-form-input>
      </b-form-group>
      <b-form-group v-else-if="argumento.type === ArgumentType.DATE_TIME" :label="argumento.name">
        <core-date-time-picker class="w-50" v-model="argumento.value" @change="changeValueHandle" />
      </b-form-group>
      <b-form-group v-else-if="argumento.type === ArgumentType.PROPERTY_MAP" :label="argumento.name">
        <b-button variant="primary" @click="addPropertyMapHandle(argumento)">Agregar</b-button>
        <b-table v-if="argumento?.value?.length > 0" small sticky-header responsive :items="argumento.value" :fields="argumentTypeFields">
        </b-table>
      </b-form-group>
    </div>
    <div v-if="isSaved">
      <i>
        <b-icon variant="primary" icon="clock-history"></b-icon>
        <small class="font-weight-bold text-primary">{{ $t('entity.action.saved') }} {{ $filters.timeElapsed(new Date()) }}</small></i
      >
    </div>

    <b-button v-else size="sm" variant="primary" @click="saveHandle()">
      <b-icon icon="save"></b-icon>
      <span>{{ $t('entity.action.save') }}</span>
    </b-button>
  </div>
</template>

<script lang="ts" src="./arguments-config.component.ts"></script>
