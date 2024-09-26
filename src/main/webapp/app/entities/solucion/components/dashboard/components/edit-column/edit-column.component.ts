import { computed, defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'EditColumn',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const columnSelected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      columnSelected,
    };
  },
});
