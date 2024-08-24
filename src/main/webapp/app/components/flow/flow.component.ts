import { computed, defineComponent, inject, ref, type Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';
import type AccountService from '@/account/account.service';
import languages from '@/shared/config/languages';
import EntitiesMenu from '@/entities/entities-menu.vue';
import { type IProceso, Proceso } from '@/shared/model/proceso/proceso.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { Estado, type IEstado } from '@/shared/model/proceso/estado.model';

import { useVueFlow, MarkerType, type NodeRemoveChange, type EdgeRemoveChange, Position } from '@vue-flow/core';
/* these are necessary styles for vue flow */
import '@vue-flow/core/dist/style.css';
/* this contains the default theme, these are optional styles */
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import StateNode from './nodes/state-node.vue';
import { faker } from '@faker-js/faker';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Flow',
  emits: ['update:modelValue'],
  components: {
    'state-node': StateNode,
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
      updateNode,
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
    const nodeToRemove: Ref<NodeRemoveChange[] | null> = ref([]);
    const edgeToRemove: Ref<EdgeRemoveChange[] | null> = ref([]);

    onInit(vueFlowInstance => {
      vueFlowInstance.fitView();
    });

    onConnect(addEdges);

    onNodesChange(async changes => {
      const nextChanges = [];
      for (const change of changes) {
        if (change.type === 'remove') {
          nodeToRemove.value?.push(change);
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
          prepareToRemoveEdge(change);
        } else {
          nextChanges.push(change);
        }
      }
      applyEdgeChanges(nextChanges);
    });

    const prepareToRemoveEdge = (change: EdgeRemoveChange) => {
      edgeToRemove.value?.push(change);
      removeElementModal.value.show();
    };

    onNodeDoubleClick(async data => {
      data.node.data.edit = true;
    });

    onNodeClick(async data => {
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.source === data.node.id;
        return edge;
      });
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

    const mapNodesAndEdges = (proceso: IProceso) => {
      console.log('Maping values');
      nodes.value = [];
      edges.value = [];

      while (nodes.value.length > 0) {
        nodes.value.pop();
      }
      while (edges.value.length > 0) {
        edges.value.pop();
      }
      proceso.estados?.forEach(estado => {
        const x = Math.floor(Math.random() * 1000) % 1000;
        const y = Math.floor(Math.random() * 1000) % 1000;
        nodes.value.push({
          id: estado.nombre,
          type: 'state',
          position: { x: x, y: y },
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
            type: 'straight',
          });
        });
      });
    };

    watch([flow], () => {
      //Make a copy of the flow
      mapNodesAndEdges(JSON.parse(JSON.stringify(flow.value)));
    });
    return {
      flow,
      nodes,
      edges,
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
        this.applyNodeChanges(this.nodeToRemove);
      }
      if (this.edgeToRemove) {
        this.applyEdgeChanges(this.edgeToRemove);
      }
      this.canceledHandler();
    },
    canceledHandler(): void {
      this.edgeToRemove = [];
      this.nodeToRemove = [];
    },
  },
});
