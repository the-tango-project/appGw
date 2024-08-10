import { defineComponent, inject, onMounted, ref, type Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import DemoInfiniteScrollService from './demo-infinite-scroll.service';
import { type IDemoInfiniteScroll } from '@/shared/model/flowMs/demo-infinite-scroll.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DemoInfiniteScroll',
  setup() {
    const { t: t$ } = useI18n();
    const demoInfiniteScrollService = inject('demoInfiniteScrollService', () => new DemoInfiniteScrollService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const itemsPerPage = ref(20);
    const queryCount: Ref<number> = ref(null);
    const page: Ref<number> = ref(1);
    const propOrder = ref('id');
    const reverse = ref(false);
    const totalItems = ref(0);

    const demoInfiniteScrolls: Ref<IDemoInfiniteScroll[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {
      page.value = 1;
    };

    const sort = (): Array<any> => {
      const result = [propOrder.value + ',' + (reverse.value ? 'desc' : 'asc')];
      if (propOrder.value !== 'id') {
        result.push('id');
      }
      return result;
    };

    const retrieveDemoInfiniteScrolls = async () => {
      isFetching.value = true;
      try {
        const paginationQuery = {
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sort(),
        };
        const res = await demoInfiniteScrollService().retrieve(paginationQuery);
        totalItems.value = Number(res.headers['x-total-count']);
        queryCount.value = totalItems.value;
        demoInfiniteScrolls.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveDemoInfiniteScrolls();
    };

    onMounted(async () => {
      await retrieveDemoInfiniteScrolls();
    });

    const removeId: Ref<string> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IDemoInfiniteScroll) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeDemoInfiniteScroll = async () => {
      try {
        await demoInfiniteScrollService().delete(removeId.value);
        const message = t$('flowMsApp.flowMsDemoInfiniteScroll.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveDemoInfiniteScrolls();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    const changeOrder = (newOrder: string) => {
      if (propOrder.value === newOrder) {
        reverse.value = !reverse.value;
      } else {
        reverse.value = false;
      }
      propOrder.value = newOrder;
    };

    // Whenever order changes, reset the pagination
    watch([propOrder, reverse], async () => {
      if (page.value === 1) {
        // first page, retrieve new data
        await retrieveDemoInfiniteScrolls();
      } else {
        // reset the pagination
        clear();
      }
    });

    // Whenever page changes, switch to the new page.
    watch(page, async () => {
      await retrieveDemoInfiniteScrolls();
    });

    return {
      demoInfiniteScrolls,
      handleSyncList,
      isFetching,
      retrieveDemoInfiniteScrolls,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeDemoInfiniteScroll,
      itemsPerPage,
      queryCount,
      page,
      propOrder,
      reverse,
      totalItems,
      changeOrder,
      t$,
    };
  },
});
