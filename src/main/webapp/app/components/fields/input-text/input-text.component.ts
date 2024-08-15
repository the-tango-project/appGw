import { computed, defineComponent, inject, ref, type Ref, defineModel } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';

import { useCoreProps } from '@/composables/coreProps';
const { coreProps } = useCoreProps();

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'InputText',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: () => 'Default value',
    },
    ...coreProps,
  },
  setup(props, { emit }) {
    const theModel = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return { theModel };
  },
});
