import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import DemoInfiniteScrollService from './demo-infinite-scroll.service';
import { type IDemoInfiniteScroll } from '@/shared/model/flowMs/demo-infinite-scroll.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DemoInfiniteScrollDetails',
  setup() {
    const demoInfiniteScrollService = inject('demoInfiniteScrollService', () => new DemoInfiniteScrollService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const demoInfiniteScroll: Ref<IDemoInfiniteScroll> = ref({});

    const retrieveDemoInfiniteScroll = async demoInfiniteScrollId => {
      try {
        const res = await demoInfiniteScrollService().find(demoInfiniteScrollId);
        demoInfiniteScroll.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.demoInfiniteScrollId) {
      retrieveDemoInfiniteScroll(route.params.demoInfiniteScrollId);
    }

    return {
      alertService,
      demoInfiniteScroll,

      previousState,
      t$: useI18n().t,
    };
  },
});
