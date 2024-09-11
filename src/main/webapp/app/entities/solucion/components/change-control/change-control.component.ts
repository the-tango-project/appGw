import { computed, defineComponent, ref } from 'vue';
import { CodeDiff } from 'v-code-diff';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Messages',
  components: {
    'code-diff': CodeDiff,
  },
  props: {
    old: {
      type: Object,
      required: true,
    },
    new: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const solution = computed(() => props.new);
    const oldSolucion = computed(() => JSON.stringify(props.old, null, 3));
    const newSolucion = computed(() => JSON.stringify(props.new, null, 3));
    const hasChange = computed(() => oldSolucion.value != newSolucion.value);

    return {
      solution,
      oldSolucion,
      newSolucion,
      hasChange,
    };
  },
});
