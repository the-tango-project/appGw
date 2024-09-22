import { defineComponent, inject } from 'vue';
import type LoginService from '@/account/login.service';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'HeroImage',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const loginService = inject<LoginService>('loginService');
    const openLogin = () => {
      if (loginService) {
        loginService.openLogin();
      }
    };
    return {
      openLogin,
    };
  },
});
