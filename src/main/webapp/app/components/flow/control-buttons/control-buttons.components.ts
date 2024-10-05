import { computed, defineComponent, ref, type Ref } from 'vue';
import { useVueFlow, MarkerType, type NodeRemoveChange, type EdgeRemoveChange, Position, type Connection } from '@vue-flow/core';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'ControlButtons',
  emits: ['zoom-in', 'zoom-out', '', '', ''],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { zoomIn, zoomOut, fitView, nodesDraggable, maxZoom, minZoom, viewport } = useVueFlow();

    const isLock: Ref<boolean> = ref(false);
    const isMaxZoom = computed(() => viewport.value.zoom >= maxZoom.value);
    const isMinZoom = computed(() => viewport.value.zoom <= minZoom.value);

    return {
      isMaxZoom,
      isMinZoom,
      isLock,
      zoomIn,
      zoomOut,
      fitView,
      nodesDraggable,
    };
  },
  methods: {
    zoomInHandler(): void {
      this.zoomIn();
    },
    zoomOutHandler(): void {
      this.zoomOut();
    },
    fitViewHandler(): void {
      this.fitView();
    },
    lockAndUnlockHandler(): void {
      this.isLock = !this.isLock;
      this.nodesDraggable = !this.isLock;
    },
  },
});
