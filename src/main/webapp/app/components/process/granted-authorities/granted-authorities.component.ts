import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';
import { Permiso } from '@/shared/model/proceso/permiso.model';

import { useStore } from '@/store';
import type { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';

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
    const toggledMap: Ref<Map<RolAutoridad | null | undefined, boolean>> = ref(new Map());
    const permisos = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      permisos,
      emit,
      toggledMap,
    };
  },
  methods: {
    toggle(rol: RolAutoridad | null | undefined): void {
      console.log(rol);
      this.toggledMap.set(rol, !this.toggledMap.get(rol));
    },
    isVisible(rol: RolAutoridad | null | undefined): boolean | undefined {
      console.log('is visible?');
      if (this.toggledMap.get(rol)) {
        this.toggledMap.set(rol, !this.toggledMap.get(rol));
        return this.toggledMap.get(rol);
      } else {
        this.toggledMap.set(rol, false);
        return this.toggledMap.get(rol);
      }
    },
  },
});
