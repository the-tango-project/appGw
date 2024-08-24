import { computed, defineComponent, inject, ref, type Ref, defineModel } from 'vue';
import { useCoreProps } from '@/composables/coreProps';
const { coreProps } = useCoreProps();

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'SelectMany',
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: String,
      default: () => '',
    },
    ...coreProps,
    options: {
      type: Array<any>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return { selected };
  },
  methods: {
    handleChange(value: any): void {
      this.$emit('change', value);
    },
  },
});
