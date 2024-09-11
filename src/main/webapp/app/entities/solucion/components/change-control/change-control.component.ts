import { computed, defineComponent, ref } from 'vue';
import { CodeDiff } from 'v-code-diff';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Messages',
  components: {
    'code-diff': CodeDiff,
  },
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
    const oldSolucion = ref(JSON.stringify(solution.value, null, 3));
    const newSolucion = ref(JSON.stringify(solution.value, null, 3));

    return {
      oldSolucion,
      newSolucion,
      solution,
    };
  },
});
