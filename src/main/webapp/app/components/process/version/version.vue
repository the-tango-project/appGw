<template>
  <div class="text-muted">
    <b-row class="ml-1">
      <b-col class="text-left" cols="0">
        <b-icon class="mt-1" font-scale="1.2" :variant="variant" :icon="icon"></b-icon>
      </b-col>
      <b-col class="text-left" cols="0">
        <b-badge variant="light"
          ><h6>
            <strong>{{ 'v.' + version + '' }}</strong>
          </h6></b-badge
        ><em class="ml-3">{{ mensaje }} </em>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" src="./version.component.ts"></script>
