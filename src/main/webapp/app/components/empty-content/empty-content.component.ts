import { defineComponent, ref } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'EmptyContent',
  emits: ['add', 'click'],
  props: {
    icon: String,
  },
  setup() {
    const isHovered = ref(false);
    return {
      isHovered,
    };
  },
  methods: {
    handleHover(hovered: any): void {
      this.isHovered = hovered;
    },
    addHandler(): void {
      this.$emit('add');
      this.$emit('click');
    },
  },
});
