import { computed, defineComponent, ref, type Ref, watch } from 'vue';

import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import { type IOption } from '@/shared/model/ui/option.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'NodeState',
  components: {
    handle: Handle,
    'node-toolbar': NodeToolbar,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: Object,
  },
  setup(props) {
    const selectOptions = useSelectOptions();
    const states: Ref<IOption[]> = ref(selectOptions.stateOptions);
    const isConnecting: Ref<boolean> = ref(false);
    const isMouseOver: Ref<boolean> = ref(false);

    const { updateNodeData, onConnectStart, onConnectEnd, onNodeMouseEnter, onNodeMouseLeave } = useVueFlow();
    const toolbarPosition = ref(Position.Bottom);
    const toolbarPositionTop = ref(Position.Top);
    const mustEditToolbarPositionTop = ref(Position.Top);
    const PositionEnum = ref(Position);
    const id = ref(props.id);
    const data = ref(props.data);
    const leftEnum = ref(Position.Left);
    const rightEnum = ref(Position.Right);
    const topEnum = ref(Position.Top);
    const bottomEnum = ref(Position.Bottom);

    const isUserMustEdit = computed(() => id.value === EstadoSolicitud.NONE);
    const isToolbarVisible = computed(() => (data as any)?.toolbarVisible);

    onConnectStart(async data => {
      isConnecting.value = true;
    });

    onConnectEnd(async (data: any) => {
      isConnecting.value = false;
    });

    onNodeMouseEnter(() => {
      isMouseOver.value = true;
    });
    onNodeMouseLeave(() => {
      isMouseOver.value = false;
    });

    const isHandleVisible = computed(() => {
      return isConnecting.value || isMouseOver.value;
    });

    return {
      mustEditToolbarPositionTop,
      isToolbarVisible,
      toolbarPosition,
      toolbarPositionTop,
      PositionEnum,
      id,
      data,
      leftEnum,
      rightEnum,
      bottomEnum,
      topEnum,
      props,
      updateNodeData,
      states,
      isUserMustEdit,
      isConnecting,
      isHandleVisible,
    };
  },
  methods: {
    deleteNodeHandler(): void {
      console.log('remove: ' + this.id);
    },

    updateNodeHandler(): void {
      this.updateNodeData(this.id, {});
    },

    addNodeHandler(): void {
      this.updateNodeData(this.id, {});
    },
  },
});
