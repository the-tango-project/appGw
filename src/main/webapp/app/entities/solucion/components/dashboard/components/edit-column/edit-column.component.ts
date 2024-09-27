import { computed, defineComponent, type Ref, ref, inject } from 'vue';
import { type IScriptResult } from '@/shared/script/script-result.model';
import ScriptService from '@/shared/script/script.service';
import type { IOption } from '@/shared/model/ui/option.model';
import { useSelectOptions } from '@/shared/composables/use-select-options';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'EditColumn',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    solution: {
      type: Object,
      required: true,
    },
    solicitud: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const scriptService = inject('scriptService', () => new ScriptService());
    const selectOptions = useSelectOptions();

    //Catalogs
    const tipoReglasFiltroOptions: Ref<IOption[]> = ref(selectOptions.tipoFilterRulesOptions);
    const authorityOptions: Ref<IOption[]> = ref(selectOptions.authorityOptions);
    const visible: Ref<boolean> = ref(true);
    const execution: Ref<IScriptResult | null> = ref(null);

    const columnToEdit = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      columnToEdit,
      visible,
      execution,
      scriptService,
      authorityOptions,
      tipoReglasFiltroOptions,
    };
  },
  methods: {
    execute(expression: any): IScriptResult {
      const context = { solucion: this.solution, solicitud: this.solicitud };
      return this.scriptService().runFunction(expression, context);
    },
    activateColumnOnFilter() {
      this.columnToEdit.filter = true;
    },
  },
});
