import { computed, defineComponent, ref, type Ref, type PropType } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';
import type { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'SelectAction',
  props: {
    modelValue: {
      type: Object as PropType<TipoAccion>,
      required: false,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const actionOptions: Ref<IOption[]> = ref(selectOptions.actionOptions);

    const selected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    return {
      selected,
      actionOptions,
    };
  },
});
