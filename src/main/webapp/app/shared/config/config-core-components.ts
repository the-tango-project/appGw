import EmptyContent from '@/components/empty-content/empty-content.vue';
import CardsList from '@/components/card-list/card-list.vue';
import ConfirmationModal from '@/components/confirmation-modal/confirmation-modal.vue';
import Flow from '@/components/flow/flow.vue';
import InputText from '@/components/fields/input-text/input-text.vue';
import SelectOne from '@/components/fields/select-one/select-one.vue';
export function initCoreComponents(vue: any) {
  vue.component('core-empty-content', EmptyContent);
  vue.component('core-card-list', CardsList);
  vue.component('core-confirmation-modal', ConfirmationModal);
  vue.component('core-flow', Flow);
  vue.component('core-input-text', InputText);
  vue.component('core-select-one', SelectOne);
}
