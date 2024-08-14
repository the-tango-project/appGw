import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';

import { useVueFlow } from '@vue-flow/core';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Flow',
  props: {
    nombre: String,
  },
  setup() {
    const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow();
    const dark = ref(false);
    const nodes = ref([
      { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
      { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
      { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
      { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
    ]);

    const edges = ref([
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: '4-e1', source: '4', target: '1', animated: true },
    ]);

    onInit(vueFlowInstance => {
      vueFlowInstance.fitView();
    });

    return {
      nodes,
      edges,
      dark,
    };
  },
});
