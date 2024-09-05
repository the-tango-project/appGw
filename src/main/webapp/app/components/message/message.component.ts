import { computed, defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'MessageComponent',
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    footer: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  setup(props) {
    const icon = computed(() => {
      if (props.variant === 'success') {
        return 'check-circle-fill';
      } else if (props.variant === 'warning' || props.variant === 'danger') {
        return 'exclamation-triangle-fill';
      } else {
        return 'info-circle-fill';
      }
    });
    return {
      icon,
    };
  },
});
