import type { IColumn } from '@/components/card-list/CardItem.model';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'SortColumns',
  props: {
    modelValue: {
      type: Array<IColumn>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const sortableKey = ref(0);

    const columns = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      sortableKey,
      columns,
    };
  },
  methods: {
    changeOrderHandler(event: any) {
      if (this.columns) {
        const leftElement = this.columns[event.oldIndex];
        const rightElement = this.columns[event.newIndex];
        this.columns.splice(event.oldIndex, 1, rightElement);
        this.columns.splice(event.newIndex, 1, leftElement);
        this.sortableKey = this.sortableKey + 1;
      }
    },
  },
});
