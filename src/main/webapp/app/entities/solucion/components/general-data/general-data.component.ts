import { computed, defineComponent, ref } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'GeneralData',
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const tipoSolutionOptions = ref(selectOptions.tipoSolutionOptions);
    const tipoAccessOptions = ref(selectOptions.tipoAccessOptions);

    const solucion = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      solucion,
      tipoSolutionOptions,
      tipoAccessOptions,
    };
  },
});
