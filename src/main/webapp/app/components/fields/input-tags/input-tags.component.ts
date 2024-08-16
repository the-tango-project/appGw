import { computed, defineComponent, inject, ref, type Ref, defineModel } from 'vue';
import { useCoreProps } from '@/composables/coreProps';
const { coreProps } = useCoreProps();

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'InputText',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: () => '',
    },
    ...coreProps,
  },
  setup(props, { emit }) {
    const theModel = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return { theModel };
  },
});
