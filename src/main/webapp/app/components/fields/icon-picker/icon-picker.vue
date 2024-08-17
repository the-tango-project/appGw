<template>
  <div>
    <label :for="id">
      {{ label }} <span v-if="required">*</span>
      <span v-if="tooltip || popover">
        <span :id="id + 'tooltip'" class="icon-info"></span>
        <b-tooltip v-if="tooltip" :target="id + 'tooltip'" :title="tooltip" placement="right"></b-tooltip>
        <b-popover v-if="popover" :target="id + 'tooltip'" triggers="hover">
          <div class="p-3">
            {{ popover }}
          </div>
        </b-popover>
      </span>
    </label>

    <b-button v-if="!selected" class="m-1" variant="outline-danger" size="sm" v-b-modal.iconSelectorModal>
      {{ $t('iconPicker.field.select') }}
    </b-button>
    <b-button v-else class="m-1" variant="light" size="sm" v-b-modal.iconSelectorModal>
      <b-icon :icon="selected"></b-icon>
    </b-button>
    <br />

    <b-modal
      ref="iconSelectorModal"
      id="iconSelectorModal"
      hide-foote
      size="xl"
      footer-border-variant="light"
      header-border-variant="light"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
    >
      <div class="modal-body">
        <b-button
          class="m-1"
          variant="light"
          size="sm"
          v-for="(icon, index) in iconsOptions"
          v-bind:key="index"
          @click="handleSelectIcon(icon)"
        >
          <b-icon :icon="icon"></b-icon>
        </b-button>

        <p class="mt-5">
          {{ $t('iconPicker.messages.instructions') }}
        </p>
        <b-input-group class="mt-3">
          <b-form-input v-model="searchedIcon" :placeholder="$t('iconPicker.field.placeholder')"></b-form-input>
          <b-input-group-append>
            <b-button v-if="searchedIcon" class="mr-1 ml-1" variant="light" size="sm">
              <b-icon :icon="searchedIcon"></b-icon>
            </b-button>
            <b-button v-if="searchedIcon" variant="primary" @click="handleAddFindedIcon">{{ $t('entity.action.add') }}</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <template #modal-footer>
        <b-button variant="outline-danger" @click="cancelHandler()">{{ $t('entity.action.cancel') }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./icon-picker.component.ts"></script>

<style lang="scss" scoped>
.btn-sm,
.btn-group-sm > .btn {
  padding: 0.5rem !important;
}
</style>
