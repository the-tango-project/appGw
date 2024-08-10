import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import DemoInfiniteScrollService from './demo-infinite-scroll.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type IDemoInfiniteScroll, DemoInfiniteScroll } from '@/shared/model/flowMs/demo-infinite-scroll.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DemoInfiniteScrollUpdate',
  setup() {
    const demoInfiniteScrollService = inject('demoInfiniteScrollService', () => new DemoInfiniteScrollService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const demoInfiniteScroll: Ref<IDemoInfiniteScroll> = ref(new DemoInfiniteScroll());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'es'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

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

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      name: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
    };
    const v$ = useVuelidate(validationRules, demoInfiniteScroll as any);
    v$.value.$validate();

    return {
      demoInfiniteScrollService,
      alertService,
      demoInfiniteScroll,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.demoInfiniteScroll.id) {
        this.demoInfiniteScrollService()
          .update(this.demoInfiniteScroll)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('flowMsApp.flowMsDemoInfiniteScroll.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.demoInfiniteScrollService()
          .create(this.demoInfiniteScroll)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('flowMsApp.flowMsDemoInfiniteScroll.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
