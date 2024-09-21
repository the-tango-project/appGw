import { type ComputedRef, defineComponent, inject, type Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type LoginService from '@/account/login.service';
import { MenuItem } from '@/shared/model/menu/menu-item.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const loginService = inject<LoginService>('loginService');
    const menuItems: Ref<any> = ref(null);

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');

    const openLogin = () => {
      loginService.openLogin();
    };

    return {
      menuItems,
      authenticated,
      username,
      openLogin,
      t$: useI18n().t,
    };
  },
  methods: {
    resolveMenuItems(): MenuItem[] {
      const items: MenuItem[] = [];
      items.push(
        new MenuItem(
          'global.menu.solutions.title',
          'global.menu.solutions.subtitle',
          'global.menu.solutions.description',
          'Solucion',
          'content/images/home/flow.svg',
        ),
      );
      items.push(
        new MenuItem(
          'global.menu.forms.title',
          'global.menu.forms.subtitle',
          'global.menu.forms.description',
          'Form',
          'content/images/home/add.svg',
        ),
      );
      items.push(
        new MenuItem(
          'global.menu.user-management.title',
          'global.menu.user-management.subtitle',
          'global.menu.user-management.description',
          'JhiUser',
          'content/images/home/manage.svg',
        ),
      );
      return items;
    },
    resolveNoAuthenticatedMenuItems(): MenuItem[] {
      const items: MenuItem[] = [];
      items.push(
        new MenuItem(
          'global.menu.login.title',
          'global.menu.login.subtitle',
          'global.menu.login.description',
          'Solucion',
          'content/images/home/auth.svg',
          'global.menu.account.login',
        ),
      );
      items.push(
        new MenuItem(
          'global.menu.registration.title',
          'global.menu.registration.subtitle',
          'global.menu.registration.description',
          'Register',
          'content/images/home/signup.svg',
          'global.menu.account.register',
        ),
      );
      return items;
    },
  },
});
