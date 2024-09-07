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

import { useVueFlow, MarkerType, type NodeRemoveChange, type EdgeRemoveChange, Position, type Connection } from '@vue-flow/core';
/* these are necessary styles for vue flow */
import '@vue-flow/core/dist/style.css';
/* this contains the default theme, these are optional styles */
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import StateNode from './nodes/state-node.vue';
import { faker } from '@faker-js/faker';
import { NodeChange } from '@/shared/model/proceso/diagram.model';
import { NodeChangeType } from '@/shared/model/enumerations/node-change-type.model';
import { MiniMap } from '@vue-flow/minimap';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Flow',
  emits: ['update:modelValue', 'update:node', 'update:edge'],
  components: {
    'state-node': StateNode,
    'mini-map': MiniMap,
  },
  props: {
    modelValue: {
      type: [Proceso, Object],
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
      onNodeClick,
      onNodesChange,
      onNodeDragStop,
      onNodeDoubleClick,
      onEdgeClick,
      onEdgesChange,
      onEdgeDoubleClick,
      onNodeMouseLeave,
      onSelectionStart,
      onSelectionEnd,
      applyNodeChanges,
      applyEdgeChanges,
      updateNodeData,
      findNode,
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

    onConnect((connection: Connection) => {
      connection.sourceHandle = 'source';
      console.log('on connect', connection);
      if (connection.sourceHandle) {
        edges.value.push({
          id: faker.database.mongodbObjectId(),
          label: 'hola',
          source: connection.source,
          target: connection.target,
          labelStyle: { fill: '#10b981', fontWeight: 700 },
          labelBgStyle: { fill: '#edf2f7' },
          markerEnd: MarkerType.ArrowClosed,
          animated: false,
          type: 'step',
          sourceHandle: 'source',
          targetHandle: connection.targetHandle,
        });
      } else {
        console.log('no connected');
      }
    });

    // TODO: Find out how it works
    onSelectionStart(changes => {
      console.log('on selection start');
      console.log(changes);
    });

    // TODO: Find out how it works
    onSelectionEnd(changes => {
      console.log('on selection end');
      console.log(changes);
    });

    /**
     * Node events
     */

    onNodesChange(changes => {
      console.log('onNodesChange');
      const nextChanges = [];
      for (const change of changes) {
        if (change.type === 'remove') {
          nodeToRemove.value?.push(change);
          removeElementModal.value.show();
        } else if (change.type === 'select') {
          const nodeFinded = findNode(change.id);
          //updateNode(.node.id, { data: { edit: true } });
          //data.node.data.edit = true;
        } else {
          nextChanges.push(change);
        }
      }
      applyNodeChanges(nextChanges);
    });

    onNodeDragStop(change => {
      const nodeChange = new NodeChange();
      nodeChange.type = NodeChangeType.POSITION;
      nodeChange.id = change.node.id;
      nodeChange.x = change.node.position.x;
      nodeChange.y = change.node.position.y;
      emit('update:node', nodeChange);
    });

    onEdgesChange(changes => {
      console.log('onEdgesChange');
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

    // TODO: MERGE INTO onNodeChange
    onNodeDoubleClick(data => {
      const nodeChange = new NodeChange();
      nodeChange.type = NodeChangeType.DOUBLE_CLICK;
      nodeChange.id = data.node.id;
      emit('update:node', nodeChange);
    });

    // TODO: MERGE INTO onNodeChange
    onNodeClick(data => {
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.source === data.node.id;
        return edge;
      });
    });

    onEdgeDoubleClick(async data => {
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.id === data.edge.id;
        return edge;
      });
    });

    const createNodesAndEdges = (proceso: IProceso) => {
      nodes.value = [];
      edges.value = [];
      proceso.estados?.forEach(estado => {
        nodes.value.push({
          id: estado.nombre,
          position: { x: estado.diagram?.x, y: estado.diagram?.y },
          type: 'state',
        });
        estado.transiciones?.forEach(transition => {
          edges.value.push({
            id: estado.nombre + '-' + transition.accion,
            label: transition.accion + ' >',
            source: estado.nombre,
            target: transition.destino,
            labelStyle: { fill: '#10b981', fontWeight: 700 },
            labelBgStyle: { fill: '#edf2f7' },
            markerEnd: MarkerType.ArrowClosed,
            animated: false,
            type: 'step',
            sourceHandle: 'source',
            targetHandle: 'target-a',
          });
        });
      });
    };

    watch([flow], () => {
      //Make a copy of the flow
      createNodesAndEdges(JSON.parse(JSON.stringify(flow.value)));
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
