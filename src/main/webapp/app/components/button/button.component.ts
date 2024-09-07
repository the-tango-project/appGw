import { computed, defineComponent, type Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'ButtonComponent',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const variant: Ref<string> = ref('primary');
    const icon: Ref<string | null> = ref(null);
    const i18nKeyText: Ref<string> = ref('entity.action.confirm');

    if (props.type === 'save') {
      variant.value = 'primary';
      icon.value = 'save';
      i18nKeyText.value = 'entity.action.save';
    } else if (props.type === 'cancel') {
      variant.value = 'outline-danger';
      icon.value = 'x-circle';
      i18nKeyText.value = 'entity.action.cancel';
    }

    return {
      emit,
      i18nKeyText,
      variant,
      icon,
    };
  },
  methods: {
    clickHandler() {
      this.emit('click');
    },
  },
});
