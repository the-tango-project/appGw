import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'SideNavbar',
  setup() {
    return {
      t$: useI18n().t,
    };
  },
});
