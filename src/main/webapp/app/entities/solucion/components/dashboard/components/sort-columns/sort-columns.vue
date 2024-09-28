<template>
  <div>
    <sortable :key="sortableKey" :list="columns" itemKey="id" tag="ul" @end="changeOrderHandler">
      <template #item="{ element, index }">
        <li class="draggable list-group-item shadow-sm border-0 mb-1 bg-white grabbable" :key="index">
          <div class="row">
            <div class="col-1"><b-icon variant="primary" font-scale="1.5" class="handle" icon="list"></b-icon></div>
            <div class="col-8">
              <span class="text-dark">
                {{ element.nombre }}
              </span>
            </div>
          </div>
        </li>
      </template>
    </sortable>
  </div>
</template>

<script lang="ts" src="./sort-columns.component.ts"></script>

<style lang="scss" scoped>
.grabbable {
  cursor: grab !important;
}
</style>
