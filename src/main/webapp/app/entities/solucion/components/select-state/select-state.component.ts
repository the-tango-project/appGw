import { computed, defineComponent, ref, type Ref, type PropType } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';
import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'SelectState',
  props: {
    modelValue: {
      type: Object as PropType<EstadoSolicitud>,
      required: false,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const stateOptions: Ref<IOption[]> = ref(selectOptions.stateOptions);

    const selected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      selected,
      stateOptions,
    };
  },
});
