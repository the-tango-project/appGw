import { computed, defineComponent, ref, type Ref } from 'vue';
import { useSolutionStore } from '@/store';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Configuration',
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const solutionStore = useSolutionStore();
    const selectOptions = useSelectOptions();
    const updateAuthoritiesModal = ref<any>(null);

    const currentAuthorities = computed(() => solutionStore.selectedRoles);
    const authoritiesToEdit: Ref<RolAutoridad[] | null> = ref(null);

    const authorityOptions = ref(selectOptions.authorityOptions);

    const openUpdateAuthoritiesModal = () => {
      authoritiesToEdit.value = JSON.parse(JSON.stringify(currentAuthorities.value));
      updateAuthoritiesModal.value.show();
    };

    const updateAuthoritiesHandler = () => {
      updateAuthoritiesModal.value.hide();
    };

    const solution = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    return {
      openUpdateAuthoritiesModal,
      updateAuthoritiesHandler,
      authoritiesToEdit,
      updateAuthoritiesModal,
      currentAuthorities,
      authorityOptions,
      solution,
    };
  },
});
