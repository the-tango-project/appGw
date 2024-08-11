import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';

import { type ICardItem } from './CardItem.model';
import { useStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CardList',
  props: {
    items: Array<any>,
    title: String,
  },
  setup() {
    return {
      t$: useI18n().t,
    };
  },
  methods: {
    isEditable(item: ICardItem): boolean {
      if (item.router || item?.buttons) {
        return true;
      } else {
        return false;
      }
    },
    hasEditableButtons(item: ICardItem): boolean {
      return item?.buttons?.length !== undefined;
    },
    findFirstEditableDestino(item: ICardItem): string | null {
      if (item?.buttons?.length !== undefined) {
        return item.buttons[0].destino !== undefined ? item.buttons[0].destino : '';
      } else {
        return '';
      }
    },
    isCardFooterVisible(item: ICardItem): boolean {
      return this.isEditable(item);
    },
    remove(): void {},
  },
});
