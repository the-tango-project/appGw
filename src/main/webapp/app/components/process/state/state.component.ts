import { computed, defineComponent, ref, type Ref } from 'vue';

import { StateEditable } from '@/shared/model/proceso/estado.model';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'StateComponent',
  props: {
    modelValue: {
      type: [StateEditable],
      required: false,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const stateOptions: Ref<IOption[]> = ref(selectOptions.stateOptions);
    const stateToEdit = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    return { stateToEdit, stateOptions };
  },
  methods: {
    updateStateHandler(stateEdited: StateEditable): void {
      console.log(stateEdited);
    },
  },
});
