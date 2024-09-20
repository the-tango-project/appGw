import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiFooter',
  setup() {
    const currentDate = ref(new Date().getFullYear());
    return {
      currentDate,
      t$: useI18n().t,
    };
  },
});
