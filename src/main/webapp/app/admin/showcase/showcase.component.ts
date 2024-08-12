import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';

import { useStore } from '@/store';
import { type ICardItem, type IRouter, type IEdit, type ITo, CardItem, Router, Edit, To } from '@/components/card-list/CardItem.model';
import { DataFaker } from '@/shared/model/DataFaker';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Showcase',
  setup() {
    const items: Ref<ICardItem[]> = ref([]);
    items.value.push(DataFaker.fakeCardItem());
    items.value.push(DataFaker.fakeCardItem());
    items.value.push(DataFaker.fakeCardItem());
    return {
      items,
    };
  },
});
