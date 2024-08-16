import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';

import { CardItem, type ICardItem, type IRouter } from './CardItem.model';
import { useStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CardList',
  props: {
    items: Array<ICardItem>,
    title: String,
  },
  setup() {},
  methods: {
    isEditable(item: ICardItem): boolean {
      if (item?.buttons && item.buttons.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    hasEditableButtons(item: ICardItem): boolean {
      return item?.buttons?.length !== undefined && item?.buttons?.length > 0;
    },
    findFirstEditableDestino(item: ICardItem): IRouter | String | null {
      if (item?.buttons?.length !== undefined && item?.buttons?.length > 0) {
        return item?.buttons[0]?.to !== undefined ? item.buttons[0].to : '';
      } else {
        return '';
      }
    },
    isCardFooterVisible(item: ICardItem): boolean {
      return this.isEditable(item);
    },
  },
});
