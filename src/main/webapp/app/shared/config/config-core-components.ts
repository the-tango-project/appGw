import EmptyContent from '@/components/empty-content/empty-content.vue';
import CardsList from '@/components/card-list/card-list.vue';
import ConfirmationModal from '@/components/confirmation-modal/confirmation-modal.vue';
import Flow from '@/components/flow/flow.vue';
import InputText from '@/components/fields/input-text/input-text.vue';
import SelectOne from '@/components/fields/select-one/select-one.vue';
import InputTags from '@/components/fields/input-tags/input-tags.vue';
import IconPicker from '@/components/fields/icon-picker/icon-picker.vue';
import CodeEditor from '@/components/fields/code-editor/code-editor.vue';
import CardListSkeleton from '@/components/skeletons/card-list-skeleton/card-list-skeleton.vue';
import MenuSkeleton from '@/components/skeletons/menu-skeleton/menu-skeleton.vue';
import WelcomeSkeleton from '@/components/skeletons/welcome-skeleton/welcome-skeleton.vue';
import TabsSkeleton from '@/components/skeletons/tabs-skeleton/tabs-skeleton.vue';
import ComentariosSkeleton from '@/components/skeletons/comentarios-skeleton/comentarios-skeleton.vue';
import TableRowSkeleton from '@/components/skeletons/table-row-skeleton/table-row-skeleton.vue';
import PerfilNavbarSkeleton from '@/components/skeletons/perfil-navbar-skeleton/perfil-navbar-skeleton.vue';

export function initCoreComponents(vue: any) {
  vue.component('core-card-list-skeleton', CardListSkeleton);
  vue.component('core-menu-skeleton', MenuSkeleton);
  vue.component('core-welcome-skeleton', WelcomeSkeleton);
  vue.component('core-tabs-skeleton', TabsSkeleton);
  vue.component('core-comentarios-skeleton', ComentariosSkeleton);
  vue.component('core-table-row-skeleton', TableRowSkeleton);
  vue.component('core-perfil-navbar-skeleton', PerfilNavbarSkeleton);
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
