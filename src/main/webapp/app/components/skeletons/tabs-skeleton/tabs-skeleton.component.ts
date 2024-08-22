import { defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TabsSkeleton',
  props: {
    icono: {
      type: String,
      default: 'person',
    },
  },
  setup() {},
});
