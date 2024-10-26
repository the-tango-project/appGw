import { computed, defineComponent, ref, type Ref, inject, onMounted, type PropType } from 'vue';
import { Transicion } from '@/shared/model/proceso/transicion.model';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import { useAlertService } from '@/shared/alert/alert.service';
import type { IOption } from '@/shared/model/ui/option.model';
import type { IRule } from '@/shared/model/rule.model';
import RuleService from '@/entities/solucion/rule.service';
import ActionService from '@/entities/solucion/action.service';
import NotificationConfig from '../notification-config/notification-config.vue';
import SelectTransitionElements from '../select-transition-elements/select-transition-elements.vue';
import type { IAction } from '@/shared/model/action.model';
import SelectAction from '../select-action/select-action.vue';
import SelectState from '../select-state/select-state.vue';
import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'EditTransition',
  components: {
    'select-action': SelectAction,
    'select-state': SelectState,
    'select-transition-elements': SelectTransitionElements,
    'notification-config': NotificationConfig,
  },
  props: {
    modelValue: {
      type: Object as PropType<Transicion>,
      required: false,
    },
    state: {
      type: Object as PropType<EstadoSolicitud>,
    },
  },
  setup(props, { emit }) {
    const deleteConfirmation: Ref<boolean> = ref(false);
    const selectOptions = useSelectOptions();
    const actionOptions: Ref<IOption[]> = ref(selectOptions.actionOptions);
    const stateOptions: Ref<IOption[]> = ref(selectOptions.stateOptions);
    const reglas: Ref<IRule[] | null> = ref([]);
    const actions: Ref<IAction[] | null> = ref([]);
    const alertService = inject('alertService', () => useAlertService(), true);
    const ruleService = inject('ruleService', () => new RuleService());
    const actionService = inject('actionService', () => new ActionService());

    // Method definition
    const retriveRules = async () => {
      try {
        const res: any = await ruleService().retrieve();
        reglas.value = res;
      } catch (error: any) {
        alertService.showHttpError(error.response);
      }
    };

    const retriveActions = async () => {
      try {
        const res: any = await actionService().retrieve();
        actions.value = res;
      } catch (error: any) {
        alertService.showHttpError(error.response);
      }
    };

    const deleteTransitionHandle = () => {
      emit('delete');
    };

    const transition = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    onMounted(async () => {
      await retriveRules();
      await retriveActions();
    });
    return {
      actionOptions,
      stateOptions,
      reglas,
      actions,
      transition,
      deleteConfirmation,
      deleteTransitionHandle,
    };
  },
});
