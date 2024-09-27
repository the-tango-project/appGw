import { Sortable } from 'sortablejs-vue3';
import { JsonViewer } from 'vue3-json-viewer';
import 'vue3-json-viewer/dist/index.css';

export function initThirdPartyComponents(vue: any) {
  vue.component('sortable', Sortable);
  vue.component('json-viewer', JsonViewer);
}
