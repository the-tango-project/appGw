import { computed, defineComponent, ref, type Ref, type PropType } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';
import type { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { useSolutionStore } from '@/store';
import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import type { ITransicion } from '@/shared/model/proceso/transicion.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'SelectAction',
  props: {
    modelValue: {
      type: Object as PropType<TipoAccion>,
      required: false,
    },
    state: {
      type: Object as PropType<EstadoSolicitud>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const solutionStore = useSolutionStore();
    let stateTransitions: any = null;
    let stateIndex = -1;

    const selected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    if (props.state) {
      stateIndex = solutionStore.selectedStates.findIndex(state => state.nombre === props.state);
    }

    if (stateIndex >= 0) {
      stateTransitions = solutionStore.selectedStates[stateIndex].transiciones;
    }

    const isSelected = (actionToFind: TipoAccion): boolean => {
      return actionToFind === selected.value;
    };

    const isInTransitionsFilter = (transitions: ITransicion[], actionToFind: TipoAccion): boolean => {
      const stateIndex = transitions.findIndex(transition => transition.accion === actionToFind);
      return stateIndex >= 0;
    };

    const defaultFilter = (transitions: ITransicion[], actionToFind: TipoAccion): boolean => {
      return true;
    };

    const notSelectedFilter = (transitions: ITransicion[], actionToFind: TipoAccion): boolean => {
      return isSelected(actionToFind) || !isInTransitionsFilter(transitions, actionToFind);
    };

    let actionsFilter = stateTransitions ? notSelectedFilter : defaultFilter;

    const actionsProcessed = selectOptions.actionOptions.map(option => {
      option.disabled = !actionsFilter(stateTransitions, option.value);
      return option;
    });

    const actionOptions: Ref<IOption[]> = ref(actionsProcessed);

    return {
      selected,
      actionOptions,
    };
  },
});
