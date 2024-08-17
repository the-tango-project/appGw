import EmptyContent from '@/components/empty-content/empty-content.vue';
import CardsList from '@/components/card-list/card-list.vue';
import ConfirmationModal from '@/components/confirmation-modal/confirmation-modal.vue';
import Flow from '@/components/flow/flow.vue';
import InputText from '@/components/fields/input-text/input-text.vue';
import SelectOne from '@/components/fields/select-one/select-one.vue';
import InputTags from '@/components/fields/input-tags/input-tags.vue';
import IconPicker from '@/components/fields/icon-picker/icon-picker.vue';
import CodeEditor from '@/components/fields/code-editor/code-editor.vue';

export function initCoreComponents(vue: any) {
  vue.component('core-empty-content', EmptyContent);
  vue.component('core-card-list', CardsList);
  vue.component('core-confirmation-modal', ConfirmationModal);
  vue.component('core-flow', Flow);
  vue.component('core-input-text', InputText);
  vue.component('core-select-one', SelectOne);
  vue.component('core-input-tags', InputTags);
  vue.component('core-icon-picker', IconPicker);
  vue.component('core-code-editor', CodeEditor);
}
