import { computed, defineComponent, ref, type Ref, watch, type PropType } from 'vue';
import { type IProceso, Proceso } from '@/shared/model/proceso/proceso.model';

import { useVueFlow, useGetPointerPosition, MarkerType, ConnectionMode, type NodeRemoveChange, type Connection } from '@vue-flow/core';
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
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import ControlButtons from './control-buttons/control-buttons.vue';
import { useI18n } from 'vue-i18n';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { LineType } from '@/shared/model/enumerations/line-type.model';

import { useMouse } from './mouse-composable';

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
      type: Object as PropType<Proceso>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const {
      connectionStatus,
      onInit,
      getViewport,
      nodesDraggable,
      onConnect,
      onConnectStart,
      onConnectEnd,
      onNodeClick,
      onNodesChange,
      onNodeDragStop,
      onNodeDoubleClick,
      onEdgeClick,
      onEdgeDoubleClick,
      applyNodeChanges,
      applyEdgeChanges,
      viewport,
    } = useVueFlow();

    const { t: t$ } = useI18n();
    const { x, y } = useMouse();
    const pointer = useGetPointerPosition();

    const flow = computed({ get: () => props.modelValue, set: value => emit('update:modelValue', value) });
    const removeElementModal = ref<any>(null);
    const removeEdgeModal = ref<any>(null);

    const nodes: Ref<any> = ref([]);
    const edges: Ref<any> = ref([]);
    const nodeToRemove: Ref<NodeRemoveChange | null> = ref(null);
    const edgeToRemove: Ref<EdgeChange | null> = ref(null);

    onInit(vueFlowInstance => {
      setTimeout(() => {
        //wait to get a vueFlowInstance prepared
        vueFlowInstance.fitView();
      }, 10);
    });

    /**
     * CONNECTION
     */
    const nodeChange: Ref<NodeChange> = ref(new NodeChange());
    onConnectStart(async data => {
      console.log('onConnectStart');
      nodeChange.value = new NodeChange();
      nodeChange.value.type = NodeChangeType.ADD;
      nodeChange.value.id = EstadoSolicitud.NONE;
      nodeChange.value.edgeChange = new EdgeChange();
      nodeChange.value.edgeChange.action = TipoAccion.NONE;
      nodeChange.value.edgeChange.type = EdgeChangeType.ADD;
      nodeChange.value.edgeChange.id = faker.database.mongodbObjectId();
      nodeChange.value.edgeChange.sourceId = data.nodeId;
      nodeChange.value.edgeChange.targetId = nodeChange.value.id;
      nodeChange.value.edgeChange.lineType = LineType.SMOOTHSTEP;
      nodeChange.value.edgeChange.sourceHandle = data.handleId;
    });

    onConnect((connection: Connection) => {
      console.log('on connect', connection);
      if (connection.sourceHandle && nodeChange.value.edgeChange) {
        nodeChange.value.edgeChange.targetId = connection.target;
        nodeChange.value.edgeChange.sourceHandle = connection.sourceHandle;
        nodeChange.value.edgeChange.targetHandle = connection.targetHandle;
        emit('update:edge', nodeChange.value.edgeChange);
      } else {
        console.log('no connected');
      }
    });

    onConnectEnd(async (data: any) => {
      console.log('connectEnd');
      const evento = { sourceEvent: data };
      // if not connected, then, create node and edge
      if (!connectionStatus.value) {
        nodeChange.value.x = pointer(evento).x; //data.x - 567.39;
        nodeChange.value.y = pointer(evento).y; //data.y - 133.995;
        emit('update:node', nodeChange.value);
      }
    });

    /**
     * GENERAL NODE EVENTS
     */
    onNodesChange(changes => {
      console.log('onNodesChange');
      console.log(changes);
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

    /**
     * Update Node position
     */
    onNodeDragStop(change => {
      const nodeChange = new NodeChange();
      nodeChange.type = NodeChangeType.POSITION;
      nodeChange.id = change.node.id;
      nodeChange.x = change.node.position.x;
      nodeChange.y = change.node.position.y;
      emit('update:node', nodeChange);
    });

    /**
     * Prepare to edit a Node
     */
    onNodeDoubleClick(data => {
      console.log('onNodeDoubleClick');
      const nodeChange = new NodeChange();
      nodeChange.type = NodeChangeType.DOUBLE_CLICK;
      nodeChange.id = data.node.id;
      emit('update:node', nodeChange);
    });

    /**
     * Draw the paths from Node source to Nodes target
     */
    onNodeClick(data => {
      console.log('onNodeClick');
      edges.value = edges.value.map((edge: any) => {
        edge.animated = edge.source === data.node.id;
        return edge;
      });
    });

    /**
     * EDGE EVENTS
     */

    onEdgeClick(async data => {
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

    /**
     * CREATION
     */
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
        label: t$('apeironGwApp.TipoAccion.' + transition.accion),
        source: from,
        target: transition.destino,
        action: transition.accion,
        labelStyle: { fill: transition.accion === TipoAccion.NONE ? 'red' : '#10b981', fontWeight: 700 },
        labelBgStyle: { fill: '#edf2f7' },
        markerEnd: MarkerType.ArrowClosed,
        arrowHeadColor: '#00000',
        animated: false,
        type: transition.diagram?.type ? transition.diagram.type : 'bezier', //bezier,step,smoothstep,straight
        sourceHandle: resolveSourceHandle(transition),
        targetHandle: resolveTargetHandle(transition),
      };
    };

    const resolveSourceHandle = (transition: ITransicion) => {
      return transition.diagram?.sourceId ? transition.diagram.sourceId : 'connector-h';
    };

    const resolveTargetHandle = (transition: ITransicion) => {
      return transition.diagram?.targetId ? transition.diagram.targetId : 'connector-b';
    };

    watch([flow], () => {
      //Make a copy of the flow test
      createNodesAndEdges(JSON.parse(JSON.stringify(flow.value)));
    });

    const connectionMode = ref(ConnectionMode.Loose);
    return {
      createEdge,
      flow,
      nodes,
      edges,
      getViewport,
      viewport,
      removeElementModal,
      removeEdgeModal,
      nodeToRemove,
      edgeToRemove,
      nodesDraggable,
      applyNodeChanges,
      applyEdgeChanges,
      connectionMode,
      emit,
      x,
      y,
    };
  },
  methods: {
    confirmeRemoveNodeHandler(): void {
      if (this.nodeToRemove) {
        //TODO: remove the node from here
        //this.applyNodeChanges(this.nodeToRemove);

        const nodeChange = new NodeChange();
        nodeChange.type = NodeChangeType.DELETE;
        nodeChange.id = this.nodeToRemove.id;
        this.emit('update:node', nodeChange);
      }
      this.canceledHandler();
    },

    //TODO: Add functionality into the front end
    confirmeRemoveEdgeHandler(): void {
      if (this.edgeToRemove) {
        //TODO: remove the edge from here
        //this.applyEdgeChanges(this.edgeToRemove);
      }
      this.canceledHandler();
    },
    canceledHandler(): void {
      this.edgeToRemove = null;
      this.nodeToRemove = null;
    },
  },
});
