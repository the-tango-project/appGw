import { defineComponent, ref, type Ref } from 'vue';

import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import { type IOption } from '@/shared/model/ui/option.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'StateNode',
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
    const selectOptions = useSelectOptions();
    const states: Ref<IOption[]> = ref(selectOptions.stateOptions);

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
      states,
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
