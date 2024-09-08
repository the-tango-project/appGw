import { computed, defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Messages',
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const solution = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      solution,
    };
  },
});
