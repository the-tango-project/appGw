import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import DemoPaginateService from './demo-paginate.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type IDemoPaginate, DemoPaginate } from '@/shared/model/flowMs/demo-paginate.model';
import { Language } from '@/shared/model/enumerations/language.model';

const useValidationRules = (validations: any, t$: any) => {
  return {
    name: {
      required: validations.required(t$('entity.validation.required').toString()),
    },
    creationDate: {},
    age: {
      integer: validations.integer(t$('entity.validation.number').toString()),
      min: validations.minValue(t$('entity.validation.min', { min: 30 }).toString(), 30),
    },
    price: {},
    active: {},
    ima: {},
    dataAnyBlob: {},
    photo: {},
    description: {
      required: validations.required(t$('entity.validation.required').toString()),
    },
    dataEnum: {},
  };
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DemoPaginateUpdate',
  setup() {
    const dataUtils = useDataUtils();
    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = useValidationRules(validations, t$);
    const demoPaginateService = inject('demoPaginateService', () => new DemoPaginateService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const demoPaginate: Ref<IDemoPaginate> = ref(new DemoPaginate());
    const languageValues: Ref<string[]> = ref(Object.keys(Language));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'es'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveDemoPaginate = async demoPaginateId => {
      try {
        const res = await demoPaginateService().find(demoPaginateId);
        res.creationDate = new Date(res.creationDate);
        demoPaginate.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.demoPaginateId) {
      retrieveDemoPaginate(route.params.demoPaginateId);
    }

    const v$ = useVuelidate(validationRules, demoPaginate as any);
    v$.value.$validate();

    return {
      demoPaginateService,
      alertService,
      demoPaginate,
      previousState,
      languageValues,
      isSaving,
      currentLanguage,
      ...dataUtils,
      v$,
      ...useDateFormat({ entityRef: demoPaginate }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.demoPaginate.id) {
        this.demoPaginateService()
          .update(this.demoPaginate)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('flowMsApp.flowMsDemoPaginate.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.demoPaginateService()
          .create(this.demoPaginate)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('flowMsApp.flowMsDemoPaginate.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    clearInputImage(field, fieldContentType, idInput): void {
      if (this.demoPaginate && field && fieldContentType) {
        if (Object.prototype.hasOwnProperty.call(this.demoPaginate, field)) {
          this.demoPaginate[field] = null;
        }
        if (Object.prototype.hasOwnProperty.call(this.demoPaginate, fieldContentType)) {
          this.demoPaginate[fieldContentType] = null;
        }
        if (idInput) {
          (<any>this).$refs[idInput] = null;
        }
      }
    },
  },
});
