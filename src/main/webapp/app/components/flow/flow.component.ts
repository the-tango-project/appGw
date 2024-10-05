import { computed, defineComponent, ref, type Ref, watch } from 'vue';
import { type IProceso, Proceso } from '@/shared/model/proceso/proceso.model';

import { useVueFlow, MarkerType, type NodeRemoveChange, type EdgeRemoveChange, Position, type Connection } from '@vue-flow/core';
/* these are necessary styles for vue flow */
import '@vue-flow/core/dist/style.css';
/* this contains the default theme, these are optional styles */
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import NodeState from './node-state/node-state.vue';
import { faker } from '@faker-js/faker';
import { EdgeChange, NodeChange } from '@/shared/model/proceso/diagram.model';
import { NodeChangeType } from '@/shared/model/enumerations/node-change-type.model';
import { MiniMap } from '@vue-flow/minimap';
import { EdgeChangeType } from '@/shared/model/enumerations/edge-change-type.model';
import ConnectionLine from './connection-line/connection-line.vue';
import type { ITransicion } from '@/shared/model/proceso/transicion.model';
import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import ControlButtons from './control-buttons/control-buttons.vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Flow',
  emits: ['update:modelValue', 'update:node', 'update:edge'],
  components: {
    'node-state': NodeState,
    'mini-map': MiniMap,
    'connection-line': ConnectionLine,
    'control-buttons': ControlButtons,
  },
  props: {
    modelValue: {
      type: [Proceso, Object],
      required: true,
    },
  },
  setup(props, { emit }) {
    const {
      onInit,
      getViewport,
      nodesDraggable,
      onConnect,
      onNodeClick,
      onNodesChange,
      onNodeDragStop,
      onNodeDoubleClick,
      onEdgeClick,
      onEdgesChange,
      onEdgeDoubleClick,
      onSelectionStart,
      onSelectionEnd,
      applyNodeChanges,
      applyEdgeChanges,
      findNode,
      viewport,
    } = useVueFlow();

    const flow = computed({ get: () => props.modelValue, set: value => emit('update:modelValue', value) });
    const removeElementModal = ref<any>(null);

    const nodes: Ref<any> = ref([]);
    const edges: Ref<any> = ref([]);
    const nodeToRemove: Ref<NodeRemoveChange[] | null> = ref([]);
    const edgeToRemove: Ref<EdgeRemoveChange[] | null> = ref([]);

    onInit(vueFlowInstance => {
      setTimeout(() => {
        //wait to get a vueFlowInstance prepared
        vueFlowInstance.fitView();
      }, 10);
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
          sourceHandle: connection.sourceHandle,
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
        console.log('type: ' + change.type);
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
        console.log('type: ' + change.type);
        if (change.type === 'remove') {
          prepareToRemoveEdge(change);
        } else if (change.type === 'select') {
          edges.value = edges.value.map((edge: any) => {
            edge.animated = edge.source === change.id;
            return edge;
          });
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
      console.log('onNodeDoubleClick');
      const nodeChange = new NodeChange();
      nodeChange.type = NodeChangeType.DOUBLE_CLICK;
      nodeChange.id = data.node.id;
      emit('update:node', nodeChange);
    });

    // TODO: MERGE INTO onNodeChange
    onNodeClick(data => {
      console.log('onNodeClick');
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.source === data.node.id;
        return edge;
      });
    });

    onEdgeClick(async data => {
      console.log('onEdgeClick');
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.id === data.edge.id;
        return edge;
      });
    });

    onEdgeDoubleClick(async data => {
      console.log('onEdgeDoubleClick');
      const edgeChange = new EdgeChange();
      edgeChange.type = EdgeChangeType.DOUBLE_CLICK;
      edgeChange.id = data.edge.id;
      edgeChange.sourceId = data.edge.source;
      edgeChange.targetId = data.edge.target;
      edgeChange.action = data.edge.action;
      emit('update:edge', edgeChange);
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
          edges.value.push(createEdge(estado.nombre, transition));
        });
      });
    };

    const createEdge = (from: EstadoSolicitud | null | undefined, transition: ITransicion): any => {
      return {
        id: from + '-' + transition.accion,
        label: transition.accion,
        source: from,
        target: transition.destino,
        action: transition.accion,
        labelStyle: { fill: '#10b981', fontWeight: 700 },
        labelBgStyle: { fill: '#edf2f7' },
        markerEnd: MarkerType.ArrowClosed,
        arrowHeadColor: '#00000',
        animated: false,
        type: transition.diagram?.type ? transition.diagram.type : 'smoothstep', //bezier,step,smoothstep,straight
        sourceHandle: transition.diagram?.sourceId,
        targetHandle: transition.diagram?.targetId,
      };
    };

    watch([flow], () => {
      //Make a copy of the flow test
      createNodesAndEdges(JSON.parse(JSON.stringify(flow.value)));
    });
    return {
      createEdge,
      flow,
      nodes,
      edges,
      getViewport,
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
