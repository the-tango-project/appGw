import { defineComponent, inject, onMounted, ref, type Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAlertService } from '@/shared/alert/alert.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { useDateFormat } from '@/shared/composables';
import { useIntersectionObserver } from '@vueuse/core';

//service
import LocalFormService from '@/entities/form/form.service';
import { type IForm } from '@/shared/model/form.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Form',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const alertService = inject('alertService', () => useAlertService(), true);
    //inject service
    const formService = inject('localFormService', () => new LocalFormService());

    const itemsPerPage = ref(20);
    const queryCount: Ref<number> = ref(null);
    const page: Ref<number> = ref(1);
    const propOrder = ref('last_modified_date');
    const reverse = ref(false);
    const totalItems = ref(0);
    const isFetching = ref(false);
    const infiniteId = ref(+new Date());
    const links: Ref<any> = ref({});

    //others
    const previousPage: Ref<number> = ref(1);
    const removeId: Ref<string> = ref(null);
    const removeEntity = ref<any>(null);

    //forms
    const forms: Ref<IForm[]> = ref([]);
    const formsCards: Ref<any[]> = ref([]);

    const clear = () => {
      page.value = 1;
      forms.value = [];
      formsCards.value = [];
      retrieveAllForms();
    };

    const retrieveAllForms = () => {
      isFetching.value = true;
      const paginationQuery = {
        page: page.value - 1,
        size: itemsPerPage.value,
        sort: sort(),
      };
      formService()
        .retrieve(paginationQuery)
        .then(res => {
          if (res.data && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              forms.value.push(res.data[i]);
              formsCards.value.push(creaRegistroCard(res.data[i]));
            }
          }
          totalItems.value = Number(res.headers['x-total-count']);
          queryCount.value = totalItems.value;
          links.value = dataUtils.parseLinks(res.headers?.['link']);
        })
        .catch(error => {
          alertService.showHttpError(error.response);
        })
        .finally(() => {
          isFetching.value = false;
        });
    };

    const handleSyncList = () => {
      clear();
    };

    const prepareRemove = (instance: IForm) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };

    const removeForm = () => {
      formService()
        .delete(removeId.value)
        .then(() => {
          const message = t$('apeironGwApp.form.deleted', { param: removeId.value }).toString();
          alertService.showInfo(message, { variant: 'danger' });
          removeId.value = null;
          clear();
          closeDialog();
        })
        .catch(error => {
          alertService.showHttpError(error.response);
        });
    };

    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const sort = (): Array<any> => {
      const result = [propOrder.value + ',' + (reverse.value ? 'desc' : 'asc')];
      if (propOrder.value !== 'id') {
        result.push('id');
      }
      return result;
    };

    const changeOrder = (newOrder: string) => {
      if (propOrder.value === newOrder) {
        reverse.value = !reverse.value;
      } else {
        reverse.value = false;
      }
      propOrder.value = newOrder;
    };

    const creaRegistroCard = (val: IForm) => {
      return {
        title: val.title,
        description: `${val.description ? val.description : ''}`,
        footer: 'this.$options.filters.timeElapsed((val as any).lastModifiedDate)',
        icon: 'icon-evaluacion-2',
        badge: [
          {
            badge: val.name ? val.name : '',
          },
        ],
        router: {
          edit: {
            to: { name: 'FormEdit', params: { formId: val.id } },
            nameBtn: 'Editar',
            icon: 'editar',
          },
        },
      };
    };

    // Whenever order changes, reset the pagination
    watch([propOrder, reverse], () => {
      clear();
    });

    // Whenever the data resets or page changes, switch to the new page.
    watch([forms, page], async ([data, page], [_prevData, prevPage]) => {
      if (data.length === 0 || page !== prevPage) {
        await retrieveAllForms();
      }
    });

    const infiniteScrollEl = ref<HTMLElement>(null);
    const intersectionObserver = useIntersectionObserver(
      infiniteScrollEl,
      intersection => {
        if (intersection[0].isIntersecting && !isFetching.value) {
          page.value++;
        }
      },
      {
        threshold: 0.5,
        immediate: false,
      },
    );

    watchEffect(() => {
      if (links.value.next) {
        intersectionObserver.resume();
      } else if (intersectionObserver.isActive) {
        intersectionObserver.pause();
      }
    });

    return {
      forms,
      formsCards,
      handleSyncList,
      isFetching,
      retrieveAllForms,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeForm,
      creaRegistroCard,
      itemsPerPage,
      queryCount,
      page,
      propOrder,
      reverse,
      totalItems,
      changeOrder,
      infiniteScrollEl,
      t$,
      ...dataUtils,
    };
  },
});
