import { computed, defineComponent, type Ref, ref } from 'vue';
import { DataFaker } from '@/shared/util/faker/DataFaker';
import type { Solicitud } from '@/shared/model/solicitud.model';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Dashboard',
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const executions: Ref<any> = ref([]);
    const columnSelected = ref(null);
    const currentColumnIndex: Ref<number | null> = ref(null);
    const solicitud: Ref<Solicitud> = ref(DataFaker.getSolicitud());
    const visible: Ref<boolean> = ref(true);
    const codeEditorModal = ref<any>(null);

    const solicitante: Ref<any> = ref(
      solicitud.value.solicitante?.nombre +
        ' ' +
        solicitud.value.solicitante?.apellidoPaterno +
        ' ' +
        solicitud.value.solicitante?.apellidoPaterno,
    );

    const solution = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    const customFieldNumber = computed(() => {
      if (solution.value?.vistaResumen?.columnas) {
        return solution.value.vistaResumen.columnas.length + 2;
      } else {
        return 2;
      }
    });

    const drag = ref(false);

    return {
      codeEditorModal,
      visible,
      columnSelected,
      currentColumnIndex,
      customFieldNumber,
      solicitante,
      executions,
      solution,
      drag,
    };
  },
  methods: {
    isHover(index: any): boolean {
      return false;
    },
    openCodeEditorModal(index: number): void {
      if (this.solution && this.codeEditorModal) {
        this.columnSelected = { ...this.solution.vistaResumen.columnas[index] };
        this.currentColumnIndex = index;
        //this.codeEditorModal.show();
      }
    },
    handleDelete(index: number): void {
      if (this.solution) {
        this.solution.vistaResumen.columnas.splice(index, 1);
      }
    },
    addVariable() {
      if (this.solution) {
        this.solution.vistaResumen.columnas.push({ id: uuidv4(), nombre: '', expresion: '', filter: false });
      }
    },
    mouseover(index: any) {},
    openPermisosPerColumnEditorModal(index: any) {},
    execute(index: any) {},
    handleOpenConfigEstadoModal() {},
    handleOpenEditButtonModal(index: number, button: any) {},
    activateColumnOnFilter() {},
    addElement() {},
  },
});
