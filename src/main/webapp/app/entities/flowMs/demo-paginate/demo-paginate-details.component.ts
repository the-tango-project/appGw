import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import DemoPaginateService from './demo-paginate.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { useDateFormat } from '@/shared/composables';
import { type IDemoPaginate } from '@/shared/model/flowMs/demo-paginate.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DemoPaginateDetails',
  setup() {
    const dateFormat = useDateFormat();
    const demoPaginateService = inject('demoPaginateService', () => new DemoPaginateService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const dataUtils = useDataUtils();

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const demoPaginate: Ref<IDemoPaginate> = ref({});

    const retrieveDemoPaginate = async demoPaginateId => {
      try {
        const res = await demoPaginateService().find(demoPaginateId);
        demoPaginate.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.demoPaginateId) {
      retrieveDemoPaginate(route.params.demoPaginateId);
    }

    return {
      ...dateFormat,
      alertService,
      demoPaginate,

      ...dataUtils,

      previousState,
      t$: useI18n().t,
    };
  },
});
