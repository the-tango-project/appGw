import { computed, defineComponent, ref, type Ref } from 'vue';
import { Permiso } from '@/shared/model/proceso/permiso.model';

import type { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import { useSelectOptions } from '@/shared/composables/use-select-options';

import { useSolutionStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'GrantedAuthoritiesComponent',
  props: {
    modelValue: {
      type: Array<Permiso>,
      required: true,
    },
    stateName: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const toggledMap: Ref<Map<RolAutoridad | null | undefined, boolean>> = ref(new Map());
    const actionByEstateOptions = useSelectOptions().actionByEstateOptions;
    const solutionStore = useSolutionStore();
    const actionsOptions = computed(() => actionByEstateOptions(solutionStore.selectedStates, props.stateName));
    const permisos = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    return {
      actionsOptions,
      permisos,
      emit,
      toggledMap,
    };
  },
  methods: {
    toggle(rol: RolAutoridad | null | undefined): void {
      this.toggledMap.set(rol, !this.toggledMap.get(rol));
    },
    isVisible(rol: RolAutoridad | null | undefined): boolean | undefined {
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
