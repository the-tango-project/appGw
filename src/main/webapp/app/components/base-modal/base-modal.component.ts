import { computed, defineComponent, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BaseModal',
  emits: ['confirmed', 'canceled', 'closed'],
  props: {
    title: {
      type: String,
      default: () => {
        return useI18n().t('global.messages.info.confirm.title');
      },
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'xl',
    },
    centered: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: Array<string>,
      default: ['cancel', 'confirm'],
    },
  },
  setup(props, ctx) {
    const baseModal = ref<any>(null);
    const accept: Ref<boolean> = ref(false);

    const hide = () => {
      baseModal.value.hide();
    };

    const textVariant = () => {
      if (props.variant === 'light') {
        return 'dark';
      } else {
        return 'light';
      }
    };

    const show = () => {
      baseModal.value.show();
    };

    const isDisabled = computed(() => {
      return !props.status;
    });

    return {
      baseModal,
      show,
      hide,
      textVariant,
      accept,
      isDisabled,
    };
  },
  methods: {
    cancelHandler(): void {
      this.$emit('canceled');
      this.accept = false;
      this.hide();
    },
    confirmationHandler(): void {
      this.$emit('confirmed');
      this.hide();
    },
    closeHandler(): void {
      this.$emit('closed');
      this.hide();
    },
    isBtnVisible(action: string) {
      return this.actions.includes(action);
    },
  },
});
