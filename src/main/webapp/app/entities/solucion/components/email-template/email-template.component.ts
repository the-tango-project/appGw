import { computed, defineComponent, ref } from 'vue';
import { MailTemplate } from '@/shared/util/mail-template';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'EmailTemplate',
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const codeFormKey = ref(0);
    const editHtml = ref(false);

    const solution = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      solution,
      codeFormKey,
      editHtml,
    };
  },
  methods: {
    loadMailTemplate(): void {
      if ((this.solution && !this.solution?.mailTemplate) || this.solution?.mailTemplate.length === 0) {
        this.solution.mailTemplate = MailTemplate.TEMPLATE;
      }
      this.codeFormKey += 1;
      this.editHtml = !this.editHtml;
    },
  },
});
