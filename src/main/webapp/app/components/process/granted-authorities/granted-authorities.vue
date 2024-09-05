<template>
  <div>
    <div v-for="(grantedAuthority, i) in permisos">
      <b-card-header :key="i" header-tag="header" class="p-1" role="tab">
        <b-button class="text-left" block @click="toggle(grantedAuthority.rol)" variant="primary">
          <b-icon
            v-if="grantedAuthority.acciones?.length != undefined && grantedAuthority.acciones.length > 2"
            class="text-left"
            icon="eye-fill"
          ></b-icon>
          <b-icon v-else icon="eye-slash"></b-icon>
          {{ $t('apeironGwApp.RolAutoridad.' + grantedAuthority.rol) }}
        </b-button>
      </b-card-header>
      <b-collapse :visible="toggledMap.get(grantedAuthority.rol)" role="tabpanel">
        <b-card-body>
          <core-aviso-editable v-model="grantedAuthority.aviso"></core-aviso-editable>
        </b-card-body>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts" src="./granted-authorities.component.ts"></script>
