import { defineComponent, type Ref, ref } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'ButtonComponent',
  emits: ['click'],
  props: {
    type: {
      type: String,
      default: 'default',
    },
    variant: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    notext: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const variant: Ref<string> = ref(props.variant);
    const icon: Ref<string | null> = ref(props.icon);
    const i18nKeyText: Ref<string> = ref('entity.action.confirm');

    const configBtnProps = (variantOp: string, iconOp: string, i18nKeyTextOp: string) => {
      variant.value = variant.value ? variant.value : variantOp;
      icon.value = icon.value ? icon.value : iconOp;
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
    } else if (props.type === 'delete') {
      configBtnProps('outline-danger', 'x-circle', 'entity.action.delete');
    } else if (props.type === 'edit') {
      configBtnProps('outline-secondary', 'pencil', 'entity.action.edit');
    } else if (props.type === 'add') {
      configBtnProps('outline-primary', 'plus', 'entity.action.add');
    } else if (props.type === 'sort') {
      configBtnProps('outline-primary', 'sort-alpha-down', 'entity.action.sort');
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
