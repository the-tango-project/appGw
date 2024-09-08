import { computed, defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'VersionComponent',
  props: {
    version: {
      type: Number,
      default: 0,
    },
    mensaje: {
      type: String,
      default: null,
    },
    archive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const variant = computed(() => (props.archive ? 'ligth' : 'warning'));
    const icon = computed(() => (props.archive ? 'archive' : 'tag-fill'));

    return {
      variant,
      icon,
    };
  },
});
