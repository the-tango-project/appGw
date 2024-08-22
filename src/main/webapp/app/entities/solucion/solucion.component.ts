import { defineComponent, inject, onMounted, ref, type Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAlertService } from '@/shared/alert/alert.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { useDateFormat } from '@/shared/composables';
import { useIntersectionObserver } from '@vueuse/core';

//service
import SolucionService from '@/entities/solucion/solucion.service';
import { type ISolucion } from '@/shared/model/solucion.model';
import { Badge, CardItem, Router, Button } from '@/components/card-list/CardItem.model';
import { faker } from '@faker-js/faker';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Solucion',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const alertService = inject('alertService', () => useAlertService(), true);
    //inject service
    const solucionService = inject('solucionService', () => new SolucionService());

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

    //solucions
    const solucions: Ref<ISolucion[]> = ref([]);
    const solucionsCards: Ref<any[]> = ref([]);

    const clear = () => {
      page.value = 1;
      solucions.value = [];
      solucionsCards.value = [];
      retrieveAllSoluciones();
    };

    const retrieveAllSoluciones = () => {
      isFetching.value = true;
      const paginationQuery = {
        page: page.value - 1,
        size: itemsPerPage.value,
        sort: sort(),
      };
      solucionService()
        .retrieve(paginationQuery)
        .then(res => {
          if (res.data && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              solucions.value.push(res.data[i]);
              solucionsCards.value.push(creaRegistroCard(res.data[i]));
            }
          }
          totalItems.value = Number(res.headers['x-total-count']);
          queryCount.value = totalItems.value;
          links.value = dataUtils.parseLinks(res.headers?.['link']);
        })
        .catch(error => {
          console.log(error);
          alertService.showHttpError(error.response);
        })
        .finally(() => {
          console.log('finally');
          isFetching.value = false;
        });
    };

    const handleSyncList = () => {
      clear();
    };

    const prepareRemove = (instance: ISolucion) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };

    const removeForm = () => {
      solucionService()
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

    const creaRegistroCard = (solucion: ISolucion) => {
      const cardItem = new CardItem();
      cardItem.title = solucion.descripcion;
      cardItem.icon = 'bookmark-check';
      cardItem.description = solucion.descripcion ? solucion.descripcion : '';
      cardItem.footer = dateFormat.timeElapsed((solucion as any).lastModifiedDate);
      const badge = new Badge();
      badge.id = faker.database.mongodbObjectId();
      badge.name = solucion.tipo ? solucion.tipo : '';
      badge.variant = 'primary';
      cardItem.badge = [badge];
      cardItem.icon = 'star';
      const button = new Button();
      button.name = 'Editar';
      button.icon = 'pencil';
      button.to = new Router();
      button.to.name = 'SolucionEdit';
      button.to.params = { solucionId: solucion.id };
      cardItem.buttons = [button];
      return cardItem;
    };

    onMounted(async () => {
      retrieveAllSoluciones();
    });

    // Whenever order changes, reset the pagination
    watch([propOrder, reverse], () => {
      clear();
    });

    // Whenever the data resets or page changes, switch to the new page.
    watch([solucions, page], async ([data, page], [_prevData, prevPage]) => {
      if (data.length === 0 || page !== prevPage) {
        retrieveAllSoluciones();
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
      solucions,
      solucionsCards,
      handleSyncList,
      isFetching,
      retrieveAllSoluciones,
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
