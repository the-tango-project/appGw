import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { useAlertService } from '@/shared/alert/alert.service';
import { useIntersectionObserver } from '@vueuse/core';
import useDataUtils from '@/shared/data/data-utils.service';
import { useValidation, useDateFormat } from '@/shared/composables';

//Entity services
import LocalFormService from '@/entities/form/form.service';
//Entity model
import { type IDemoPaginate, DemoPaginate } from '@/shared/model/flowMs/demo-paginate.model';
import { Language } from '@/shared/model/enumerations/language.model';

const useValidationRules = (validations: any, t$: any) => {
  return {};
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FormUpdate',
  setup() {
    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = useValidationRules(validations, t$);
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const route = useRoute();
    const router = useRouter();
    const alertService = inject('alertService', () => useAlertService(), true);

    //Inject user services

    return {
      ...dateFormat,
      ...dataUtils,
      t$,
    };
  },
});
