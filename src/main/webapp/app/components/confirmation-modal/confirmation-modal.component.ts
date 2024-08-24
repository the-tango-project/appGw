import { computed, defineComponent, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ConfirmationModal',
  emits: ['confirmed', 'canceled'],
  props: {
    title: {
      type: String,
      default: () => {
        return useI18n().t('global.messages.info.confirm.title');
      },
    },
    question: {
      type: String,
      default: () => {
        return '<h3>' + useI18n().t('global.messages.info.confirm.question') + '</h3>';
      },
    },
    check: {
      type: Boolean,
      default: false,
    },
    checkMessage: {
      type: String,
      default: () => {
        return useI18n().t('global.messages.info.confirm.accept');
      },
    },
    addComentario: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
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
  },
  setup(props, ctx) {
    const confirmationModal = ref<any>(null);
    const comentario: Ref<string> = ref('');
    const accept: Ref<boolean> = ref(false);

    const hide = () => {
      confirmationModal.value.hide();
    };

    const textVariant = () => {
      if (props.variant === 'light') {
        return 'dark';
      } else {
        return 'light';
      }
    };

    const show = () => {
      confirmationModal.value.show();
    };

    const isDisabled = computed(() => {
      if (props.addComentario && comentario.value.length < 10) {
        return true;
      }

      if (props.check) {
        return !accept.value;
      } else {
        return false;
      }
    });

    return {
      confirmationModal,
      show,
      hide,
      textVariant,
      comentario,
      accept,
      isDisabled,
    };
  },
  methods: {
    cancelHandler(): void {
      this.$emit('canceled', this.comentario);
      this.accept = false;
      this.hide();
    },
    confirmationHandler(): void {
      this.$emit('confirmed', this.comentario);
      this.hide();
      this.comentario = '';
    },
  },
});
