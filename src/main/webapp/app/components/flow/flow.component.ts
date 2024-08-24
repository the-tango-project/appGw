import { computed, defineComponent, inject, ref, type Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';
import { type IProceso, Proceso } from '@/shared/model/proceso/proceso.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { Estado } from '@/shared/model/proceso/estado.model';

import { useVueFlow, MarkerType, type NodeRemoveChange, type EdgeRemoveChange, Position } from '@vue-flow/core';
/* these are necessary styles for vue flow */
import '@vue-flow/core/dist/style.css';
/* this contains the default theme, these are optional styles */
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import OperatorNode from './nodes/operator-node.vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Flow',
  emits: ['update:modelValue'],
  components: {
    'operator-node': OperatorNode,
  },
  props: {
    modelValue: {
      type: Proceso,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isLock: Ref<boolean> = ref(false);
    const removeElementModal = ref<any>(null);

    const {
      onInit,
      zoomIn,
      zoomOut,
      fitView,
      getViewport,
      addEdges,
      nodesDraggable,
      onConnect,
      onNodesChange,
      onEdgesChange,
      onEdgeClick,
      onEdgeDoubleClick,
      onNodeDoubleClick,
      onNodeClick,
      onNodeMouseLeave,
      applyNodeChanges,
      applyEdgeChanges,
      maxZoom,
      minZoom,
      viewport,
    } = useVueFlow();

    const flow = computed({ get: () => props.modelValue, set: value => emit('update:modelValue', value) });
    const isMaxZoom = computed(() => viewport.value.zoom >= maxZoom.value);
    const isMinZoom = computed(() => viewport.value.zoom <= minZoom.value);

    const resolveRoles = (estado: Estado, accion: TipoAccion | null | undefined): Array<any> => {
      const roles: Array<any> = [];
      if (estado.permisos) {
        estado.permisos.forEach(permiso => {
          if (permiso.acciones && permiso.acciones.findIndex(e => e === accion) > -1) {
            if (permiso.rol) {
              roles.push(permiso.rol.toLocaleLowerCase());
            }
          }
        });
      }
      return roles;
    };

    const nodes: Ref<any> = ref([]);
    const edges: Ref<any> = ref([]);

    // Whenever order changes, reset the pagination
    watch([flow], () => {
      nodes.value = [];
      edges.value = [];
      flow.value.estados?.forEach(estado => {
        nodes.value.push({
          id: estado.nombre,
          type: 'operator',
          label: estado.nombre,
          position: { x: 100, y: 100 },
        });
        estado.transiciones?.forEach(transition => {
          edges.value.push({
            id: estado.nombre + '-' + transition.accion,
            label: transition.accion + ' roles ' + resolveRoles(estado, transition.accion),
            source: estado.nombre,
            target: transition.destino,
            labelBgStyle: { fill: 'orange' },
            markerEnd: MarkerType.ArrowClosed,
            animated: false,
          });
        });
      });
    });

    const dark = ref(false);
    const nodeToRemove: Ref<NodeRemoveChange | null> = ref(null);
    const edgeToRemove: Ref<EdgeRemoveChange | null> = ref(null);

    onInit(vueFlowInstance => {
      vueFlowInstance.fitView();
    });

    onConnect(addEdges);

    onNodesChange(async changes => {
      const nextChanges = [];
      for (const change of changes) {
        if (change.type === 'remove') {
          nodeToRemove.value = change;
          removeElementModal.value.show();
        } else {
          nextChanges.push(change);
        }
      }
      applyNodeChanges(nextChanges);
    });

    onEdgesChange(async changes => {
      const nextChanges = [];
      for (const change of changes) {
        if (change.type === 'remove') {
          edgeToRemove.value = change;
          removeElementModal.value.show();
        } else {
          nextChanges.push(change);
        }
      }
      applyEdgeChanges(nextChanges);
    });

    onNodeDoubleClick(async data => {
      data.node.data.edit = true;
    });

    onNodeClick(async data => {
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.source === data.node.id;
        return edge;
      });
      data.node.data.dummy = 'hey!';
    });

    onNodeMouseLeave(async data => {
      data.node.data.edit = false;
    });

    onEdgeDoubleClick(async data => {
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.id === data.edge.id;
        return edge;
      });
    });

    return {
      flow,
      nodes,
      edges,
      dark,
      isLock,
      zoomIn,
      zoomOut,
      fitView,
      getViewport,
      isMaxZoom,
      isMinZoom,
      viewport,
      removeElementModal,
      nodeToRemove,
      edgeToRemove,
      nodesDraggable,
      applyNodeChanges,
      applyEdgeChanges,
    };
  },
  methods: {
    zoomOutHandler(): void {
      this.zoomOut();
    },
    zoomInHandler(): void {
      this.zoomIn();
    },
    fitViewHandler(): void {
      this.fitView();
    },
    lockAndUnlockHandler(): void {
      this.isLock = !this.isLock;
      this.nodesDraggable = !this.isLock;
    },
    confirmedHandler(): void {
      if (this.nodeToRemove) {
        this.applyNodeChanges([this.nodeToRemove]);
      }
      if (this.edgeToRemove) {
        this.applyEdgeChanges([this.edgeToRemove]);
      }
      this.canceledHandler();
    },
    canceledHandler(): void {
      this.edgeToRemove = null;
      this.nodeToRemove = null;
      this.removeElementModal.hide();
    },
  },
});
