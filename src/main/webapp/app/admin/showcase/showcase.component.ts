import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { type ICardItem, type IRouter, type IEdit, type ITo, CardItem, Router, Edit, To } from '@/components/card-list/CardItem.model';
import { DataFaker } from '@/shared/model/DataFaker';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Showcase',
  setup() {
    const confirmWithMessageModal = ref<any>(null);
    const simpleConfirmModal = ref<any>(null);
    const items: Ref<ICardItem[]> = ref([]);
    const modalResultComment: Ref<String> = ref(null);
    const modalResult: Ref<String> = ref(null);
    items.value.push(DataFaker.fakeCardItem());
    items.value.push(DataFaker.fakeCardItem());
    items.value.push(DataFaker.fakeCardItem());

    return {
      items,
      confirmWithMessageModal,
      simpleConfirmModal,
      modalResult,
      modalResultComment,
    };
  },
  methods: {
    showModal(modalType: string) {
      if (modalType === 'simpleConfirmModal') {
        this.simpleConfirmModal.show();
      } else if (modalType === 'confirmWithMessageModal') {
        this.confirmWithMessageModal.show();
      }
    },
    confirmedHandler(result: any): void {
      this.configComentario(result);
      this.modalResult = 'confirmed';
    },
    canceledHandler(result: any): void {
      this.configComentario(result);
      this.modalResult = 'canceled';
    },
    configComentario(result: any): void {
      if (result) {
        this.modalResultComment = result;
      } else {
        this.modalResultComment = null;
      }
    },
  },
});
