import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import useSelectOptions from '@/shared/composables/select-options';
import { type ICardItem, type IRouter, CardItem, Router } from '@/components/card-list/CardItem.model';
import { DataFaker } from '@/shared/model/DataFaker';
import { Option, type IOption } from '@/shared/model/ui/option.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Showcase',
  setup() {
    const selectOptions = useSelectOptions();

    const confirmWithMessageModal = ref<any>(null);
    const simpleConfirmModal = ref<any>(null);
    const items: Ref<ICardItem[]> = ref([]);
    items.value.push(DataFaker.fakeCardItem());
    items.value.push(DataFaker.fakeCardItem());
    items.value.push(DataFaker.fakeCardItem());

    //form variables
    const fullname = ref('hola');
    const componenteSelected = ref('');
    const tags = ref([]);
    const iconSelected = ref(null);

    const modalResult: Ref<String> = ref(null);
    const modalResultComment: Ref<String> = ref(null);

    const tipoComponentsValues: Ref<IOption[]> = ref(selectOptions.tipoComponente());

    return {
      items,
      tags,
      confirmWithMessageModal,
      simpleConfirmModal,
      modalResult,
      modalResultComment,
      fullname,
      componenteSelected,
      tipoComponentsValues,
      iconSelected,
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
