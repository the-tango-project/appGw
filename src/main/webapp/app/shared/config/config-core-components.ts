import EmptyContent from '@/components/empty-content/empty-content.vue';
import CardsList from '@/components/card-list/card-list.vue';

export function initCoreComponents(vue) {
  vue.component('core-empty-content', EmptyContent);
  vue.component('core-card-list', CardsList);
}
