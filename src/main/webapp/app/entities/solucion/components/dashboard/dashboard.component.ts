import { computed, defineComponent, type Ref, ref, inject } from 'vue';
import { DataFaker } from '@/shared/util/faker/DataFaker';
import type { Solicitud } from '@/shared/model/solicitud.model';
import ScriptService from '@/shared/script/script.service';
import { v4 as uuidv4 } from 'uuid';
import { useSelectOptions } from '@/shared/composables/use-select-options';

import type { IColumna } from '@/shared/model/columna.model';
import type { IOption } from '@/shared/model/ui/option.model';
import { ScriptResult, type IScriptResult } from '@/shared/script/script-result.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'Dashboard',
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const scriptService = inject('scriptService', () => new ScriptService());
    const execution: Ref<IScriptResult | null> = ref(null);

    const executions: Ref<any> = ref([]);
    const columnSelected: Ref<IColumna | null> = ref(null);
    const solicitud: Ref<Solicitud> = ref(DataFaker.getSolicitud());
    const visible: Ref<boolean> = ref(true);

    // CATALOGS
    const selectOptions = useSelectOptions();
    const roles: Ref<IOption[]> = ref(selectOptions.authorityOptions);

    //EDIT MODAL
    const codeEditorModal = ref<any>(null);
    const editarButtonModal = ref<any>(null);
    const currentColumnIndex: Ref<number | null> = ref(null);
    const currentButtonIndex: Ref<number | null> = ref(null);
    const currentButtonEditable: Ref<any | null> = ref(null);
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
      currentButtonIndex,
      solicitud,
      scriptService,
      currentButtonEditable,
      codeEditorModal,
      editarButtonModal,
      visible,
      roles,
      columnSelected,
      currentColumnIndex,
      customFieldNumber,
      solicitante,
      executions,
      execution,
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
        this.codeEditorModal.show();
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
    handleOpenConfigEstadoModal() {},
    handleOpenEditButtonModal(buttonIndex: number, button: any) {
      this.currentButtonEditable = { ...button };
      this.currentButtonIndex = buttonIndex;
      if (<any>this.$refs.editarButtonModal) {
        (<any>this.$refs.editarButtonModal).show();
      }
    },
    activateColumnOnFilter() {},
    addElement() {},
    execute(expression: any): IScriptResult {
      const context = { solucion: this.solution, solicitud: this.solicitud };
      return this.scriptService().runFunction(expression, context);
    },
    handleCancel(modal: string) {
      (<any>this[modal]).hide();
    },
    handleConfirmation(modal: string) {
      if (this.solution) {
        this.solution.vistaResumen.columnas.splice(this.currentColumnIndex, 1, this.columnSelected);
        this.currentColumnIndex = -1;
        this.handleCancel(modal);
      }
    },
  },
});
