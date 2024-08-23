import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { useAlertService } from '@/shared/alert/alert.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { useValidation, useDateFormat } from '@/shared/composables';

//Entity services
import LocalFormService from '@/entities/form/form.service';
import ScriptService from '@/shared/script/script.service';

//Entity model
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { MenuElement } from '@/shared/model/enumerations/menu-element.model';
import { Form, type IForm } from '@/shared/model/form.model';

import useSelectOptions from '@/shared/composables/select-options';

const useValidationRules = (validations: any, t$: any) => {
  return {
    title: { required: validations.required(t$('entity.validation.required').toString()) },
    menuName: {},
    description: {},
    name: {},
    path: {},
    type: {},
    icon: {},
    display: {},
    tags: {},
    owner: {},
    machineName: {},
    tipo: {},
  };
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FormUpdate',
  setup() {
    //Commons methods
    const { t: t$ } = useI18n();
    const selectOptions = useSelectOptions();
    const validations = useValidation();
    const validationRules = useValidationRules(validations, t$);
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const route = useRoute();
    const router = useRouter();
    const monacoOptions = ref({ colorDecorators: true, lineHeight: 24, tabSize: 2 });
    const test = ref('text/javascript');
    //Common services
    const alertService = inject('alertService', () => useAlertService(), true);
    const localFormService = inject('localFormService', () => new LocalFormService());
    const scriptService = inject('scriptService', () => new ScriptService());

    //Common properties
    const form: Ref<IForm> = ref(new Form());
    const isSaving: Ref<Boolean> = ref(false);
    const isImporting: Ref<Boolean> = ref(false);
    const tabIndex: Ref<Number> = ref(0);
    //SelectOne options
    const tipoMenuOptions = ref(selectOptions.tipoMenu());
    const tipoComponentOptions = ref(selectOptions.tipoComponente());
    // Method definition
    const retriveById = async (formId: any) => {
      try {
        const res = await localFormService().find(formId);
        form.value = res;
      } catch (error: any) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.formId) {
      retriveById(route.params.formId);
    }

    //Validation configuration
    const v$ = useVuelidate(validationRules, form as any);
    v$.value.$validate();
    return {
      monacoOptions,
      test,
      tipoMenuOptions,
      tipoComponentOptions,
      ...dateFormat,
      ...dataUtils,
      form,
      isSaving,
      tabIndex,
      isImporting,
      t$,
      v$,
      router,
      alertService,
      localFormService,
      scriptService,
    };
  },
  methods: {
    handleClone(): void {},
    handleExport(): void {},
    handleOpenImportModal(): void {},
    handleActivatedTab(): void {},
    linkClass(index: Number): String[] {
      if (this.tabIndex === index) {
        return ['bg-primary', 'text-light'];
      } else {
        return ['bg-light'];
      }
    },
    resolveIcon(icon: String, index: Number): String {
      return icon + (this.isTabActive(index) ? '-fill' : '');
    },
    isTabActive(index: Number): Boolean {
      if (this.tabIndex === index) {
        return true;
      } else {
        return false;
      }
    },
    previousState(): void {
      this.router.go(-1);
    },
    createForm(): void {},
    save(): void {
      this.isSaving = true;
      if (this.form.id) {
        this.localFormService()
          .update(this.form)
          .then((param: any) => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('flowMsApp.flowMsDemoPaginate.updated', { param: param.id }));
          })
          .catch((error: any) => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.localFormService()
          .create(this.form)
          .then((param: any) => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('flowMsApp.flowMsDemoPaginate.created', { param: param.id }).toString());
          })
          .catch((error: any) => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
