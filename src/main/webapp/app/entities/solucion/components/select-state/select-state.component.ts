import { computed, defineComponent, ref, type Ref, type PropType } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';
import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { useSolutionStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'SelectState',
  props: {
    modelValue: {
      type: Object as PropType<EstadoSolicitud>,
      required: false,
    },
    onlySelected: {
      type: Boolean,
      default: false,
    },
    onlyNotSelected: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const solutionStore = useSolutionStore();

    const selected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    const isInStates = (stateToFind: EstadoSolicitud): boolean => {
      const indexFinded = solutionStore.selectedStates.findIndex(state => state.nombre === stateToFind);
      return indexFinded >= 0;
    };

    const isSelected = (stateToFind: EstadoSolicitud): boolean => {
      return stateToFind === selected.value;
    };

    const selectedStatesFilter = (stateToFind: EstadoSolicitud): boolean => {
      return isSelected(stateToFind) || isInStates(stateToFind);
    };

    const notSelectedStatesFilter = (stateToFind: EstadoSolicitud): boolean => {
      return isSelected(stateToFind) || !isInStates(stateToFind);
    };

    let statesFilter = (stateToFind: EstadoSolicitud) => true;

    if (props.onlySelected) {
      statesFilter = selectedStatesFilter;
    }

    if (props.onlyNotSelected) {
      statesFilter = notSelectedStatesFilter;
    }

    const stateOptions: Ref<IOption[]> = ref(selectOptions.stateOptions.filter(option => statesFilter(option.value)));

    return {
      selected,
      stateOptions,
    };
  },
});
