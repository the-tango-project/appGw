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

    notext: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const variant: Ref<string> = ref('primary');
    const icon: Ref<string | null> = ref(null);
    const i18nKeyText: Ref<string> = ref('entity.action.confirm');

    const configBtnProps = (variantOp: string, iconOp: string, i18nKeyTextOp: string) => {
      variant.value = variantOp;
      icon.value = iconOp;
      i18nKeyText.value = i18nKeyTextOp;
    };

    if (props.type === 'save') {
      configBtnProps('primary', 'save', 'entity.action.save');
    } else if (props.type === 'cancel') {
      configBtnProps('outline-danger', 'x-circle', 'entity.action.cancel');
    } else if (props.type === 'return') {
      configBtnProps('outline-danger', 'arrow-return-left', 'global.navigation.return');
    } else if (props.type === 'import') {
      configBtnProps('outline-success', 'arrow-bar-up', 'entity.action.import.title');
    } else if (props.type === 'export') {
      configBtnProps('outline-success', 'arrow-bar-down', 'entity.action.import.export');
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
