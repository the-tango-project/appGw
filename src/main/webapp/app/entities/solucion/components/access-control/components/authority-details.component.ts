import { Autoridad } from '@/shared/model/autoridad.model';
import { computed, defineComponent } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'AuthorityDetails',
  props: {
    modelValue: {
      type: Autoridad,
    },
    noRoles: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const authorityOptions = useSelectOptions().authorityOptions;

    const authority = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      authority,
      authorityOptions,
    };
  },
});
