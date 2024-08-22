import { defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CardListSkeleton',
  props: {
    icono: {
      type: String,
      default: 'person',
    },
  },
  setup() {},
});
