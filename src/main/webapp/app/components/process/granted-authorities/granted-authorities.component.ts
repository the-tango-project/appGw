import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';
import { Permiso } from '@/shared/model/proceso/permiso.model';

import { useStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'GrantedAuthoritiesComponent',
  props: {
    modelValue: {
      type: Array<Permiso>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const permisos = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      permisos,
    };
  },
});
