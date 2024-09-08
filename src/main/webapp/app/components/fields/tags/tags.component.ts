import { computed, defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TagsComponent',
  props: {
    value: {
      type: Array<string>,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'sm',
    },
    limit: {
      type: Number,
      default: 5,
    },
    placeholder: {
      type: String,
      default: 'Ingrese tags',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const tags = computed({
      get: () => props.value,
      set: value => emit('input', value),
    });
    return {
      tags,
    };
  },
});
