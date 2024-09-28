import { Transicion } from '@/shared/model/proceso/transicion.model';
import { computed, defineComponent, ref, type Ref } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'EditTransition',
  props: {
    modelValue: {
      type: Transicion,
      required: false,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const actionOptions: Ref<IOption[]> = ref(selectOptions.actionOptions);
    const stateOptions: Ref<IOption[]> = ref(selectOptions.stateOptions);

    const transition = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      actionOptions,
      stateOptions,
      transition,
    };
  },
});
