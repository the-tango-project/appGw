import { defineComponent, ref, type Ref } from 'vue';

import { type ICardItem } from '@/components/card-list/CardItem.model';
import { DataFaker } from '@/shared/util/faker/DataFaker';

import { useSelectOptions } from '@/shared/composables/use-select-options';

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
    const fullname = ref('this is the fullname');
    const componenteSelected = ref('');
    const tags = ref(['tag A', 'tag B']);
    const iconSelected = ref(null);
    const codeText = ref('const sum = 10;');
    const codeLanguage = ref('text/javascript');

    const modalResult: Ref<string | null> = ref(null);
    const modalResultComment: Ref<string | null> = ref(null);

    const tipoComponentsValues = selectOptions.componenteOptions;

    return {
      items,
      tags,
      codeText,
      codeLanguage,
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
