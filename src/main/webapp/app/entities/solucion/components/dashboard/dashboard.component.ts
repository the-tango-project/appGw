import { computed, defineComponent, type Ref, ref, inject } from 'vue';
import { DataFaker } from '@/shared/util/faker/DataFaker';
import type { Solicitud } from '@/shared/model/solicitud.model';
import { v4 as uuidv4 } from 'uuid';

import { type IColumna, Columna } from '@/shared/model/columna.model';
import EditColumn from './components/edit-column/edit-column.vue';
import EditMask from './components/edit-mask/edit-mask.vue';
import EditButtons from './components/edit-buttons/edit-buttons.vue';
import SortColumns from './components/sort-columns/sort-columns.vue';
import ScriptService from '@/shared/script/script.service';
import type { IScriptResult } from '@/shared/script/script-result.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Dashboard',
  components: {
    'edit-column': EditColumn,
    'edit-mask': EditMask,
    'edit-buttons': EditButtons,
    'sort-columns': SortColumns,
  },
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const scriptService = inject('scriptService', () => new ScriptService());

    const executions: Ref<any> = ref([]);
    const columnSelected: Ref<IColumna | null> = ref(null);
    const solicitud: Ref<Solicitud> = ref(DataFaker.getSolicitud());
    const isHover: Ref<boolean> = ref(false);

    //EDIT MODAL
    const createColumnModal = ref<any>(null);
    const editColumnModal = ref<any>(null);
    const removeElementModal = ref<any>(null);
    const permisosPerColumnEditorModal = ref<any>(null);
    const sortColumnsModal = ref<any>(null);
    const configEstadoModal = ref<any>();
    //INDEX
    const currentColumnIndex: Ref<number | null> = ref(null);
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
      isHover,
      sortColumnsModal,
      permisosPerColumnEditorModal,
      removeElementModal,
      configEstadoModal,
      scriptService,
      solicitud,
      createColumnModal,
      editColumnModal,
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
      if (this.solution && this.editColumnModal) {
        this.columnSelected = { ...this.solution.vistaResumen.columnas[index] };
        this.currentColumnIndex = index;
        this.editColumnModal.show();
      }
    },
    handleDelete(index: number): void {
      if (this.solution) {
        this.columnSelected = { ...this.solution.vistaResumen.columnas[index] };
        this.currentColumnIndex = index;
        this.removeElementModal.show();
      }
    },
    addVariable() {
      this.columnSelected = new Columna();
      this.columnSelected.id = uuidv4();
      this.columnSelected.filter = false;
      this.currentColumnIndex = -2;
      this.createColumnModal.show();
    },
    mouseover(index: any) {},
    handleOpenConfigEstadoModal() {
      this.configEstadoModal.show();
    },
    activateColumnOnFilter() {},
    addElement() {},

    handleCancel(modal: string) {
      (<any>this[modal]).hide();
    },
    addColumnHandler(modal: string) {
      if (this.solution) {
        this.solution.vistaResumen.columnas.push(this.columnSelected);
        this.columnSelected = new Columna();
      }
    },
    editColumnHandler(modal: string) {
      if (this.solution) {
        this.solution.vistaResumen.columnas.splice(this.currentColumnIndex, 1, this.columnSelected);
        this.currentColumnIndex = -1;
        this.handleCancel(modal);
      }
    },
    execute(expression: any): IScriptResult {
      const context = { solucion: this.solution, solicitud: this.solicitud };
      return this.scriptService().runFunction(expression, context);
    },
    deleteColumnHandler() {
      if (this.solution) {
        this.solution.vistaResumen.columnas.splice(this.currentColumnIndex, 1);
      }
    },
    sortColumnsHandler() {
      this.sortColumnsModal.show();
    },
    handleHover(hovered: any) {
      console.log(hovered);
      this.isHover = hovered;
    },
  },
});
