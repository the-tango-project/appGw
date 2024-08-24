import { defineComponent, ref, type Ref } from 'vue';

import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'OperatorNode',
  components: {
    handle: Handle,
    'node-toolbar': NodeToolbar,
  },
  props: {
    id: String,
    data: Object,
  },
  setup(props) {
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
      applyNodeChanges,
      applyEdgeChanges,
      maxZoom,
      minZoom,
      viewport,
    } = useVueFlow();
    const { updateNodeData } = useVueFlow();
    const toolbarPosition = ref(Position.Right);
    const toolbarPositionTop = ref(Position.Top);
    const PositionEnum = ref(Position);
    const id = ref(props.id);
    const data = ref(props.data);
    const leftEnum = ref(Position.Left);
    const rightEnum = ref(Position.Right);

    return {
      toolbarPosition,
      toolbarPositionTop,
      PositionEnum,
      id,
      data,
      leftEnum,
      rightEnum,
      props,
      updateNodeData,
    };
  },
  methods: {
    deleteNodeHandler(): void {
      console.log('remove: ' + this.id);
    },

    updateNodeHandler(): void {
      this.updateNodeData(this.id, {});
    },
  },
});
