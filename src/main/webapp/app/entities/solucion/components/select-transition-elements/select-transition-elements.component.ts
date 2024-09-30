import type { IArgument } from '@/shared/model/argument.model';
import { computed, defineComponent, type Ref, ref } from 'vue';
import ArgumentsConfig from '../arguments-config/arguments-config.vue';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'SelectTransitionElements',
  components: {
    'arguments-config': ArgumentsConfig,
  },
  props: {
    id: String,
    items: {
      type: [Array<any>],
      required: true,
    },
    addTagsColumn: Boolean,
    addConditionColumn: Boolean,

    modelValue: {
      type: [Array<any>],
      required: true,
    },
  },
  setup(props, { emit }) {
    const isFirst: Ref<boolean> = ref(true);
    const isLoading: Ref<boolean> = ref(false);

    const filter: Ref<any> = ref(null);
    const filterOn: Ref<any[]> = ref([]);
    const currentPage: Ref<number> = ref(1);
    const perPage: Ref<number> = ref(10);
    const totalRows: Ref<number> = ref(props.items.length);
    const selected = computed(() => JSON.parse(JSON.stringify(props.modelValue)));
    const originalSelected = computed(() => JSON.parse(JSON.stringify(props.modelValue)));
    const currentRowSelected: Ref<any> = ref(null);

    //se inicializa el componente para que no muestre detalles en un inicio
    for (const item of props.items) {
      if (item._showDetails) {
        item._showDetails = false;
      }
    }

    const customFields = computed(() => {
      let defaultFields = [{ key: '#', stickyColumn: true }, 'clave', 'nombre'];
      if (props.addConditionColumn) {
        defaultFields = defaultFields.concat(['condicion']);
      }
      if (props.addTagsColumn) {
        defaultFields = defaultFields.concat(['tags']);
      }

      return defaultFields;
    });

    const totalSelectedRows = computed(() => {
      if (selected?.value.length) {
        return selected.value.length;
      }
      return 0;
    });

    return {
      isFirst,
      isLoading,
      filter,
      filterOn,
      currentPage,
      perPage,
      totalRows,
      selected,
      originalSelected,
      customFields,
      totalSelectedRows,
      currentRowSelected,
    };
  },
  methods: {
    onFiltered(filteredItems: any): void {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    rowClass(item: any, type: any): string {
      if (!item || type !== 'row') return '';
      if (this.isRowSelected(item)) return 'table-primary-opacity-10';
      return '';
    },
    isRowSelected(item: any): boolean {
      if (this.selected?.length) {
        return this.selected.filter((element: any) => element.clave === item.clave).length > 0;
      }
      return false;
    },
    hasArguments(row: any): boolean {
      if (row?.item?.arguments?.length > 0) {
        return true;
      }
      return false;
    },
    openConfigurarComponente(row: any): void {
      this.currentRowSelected = this.originalSelected.find((selected: any) => selected.clave === row.item.clave);
      row.toggleDetails();
    },
    handleUpdateArguments(argumentos: IArgument[]) {
      //this.$set(this.currentRowSelected, 'arguments', argumentos);
      this.currentRowSelected.arguments = argumentos;
      this.$emit('input', this.originalSelected);
    },
    /**
     * Este método se utiliza para mapear únicamente los valores
     * de un registro que nos interesa copiar en la lista original,
     * de tal manera que propiedades que agrega el framework
     * de b-table como lo son rowSelected entre otros
     */
    mapToOriginalSelection(item: any): any {
      return {
        clave: item.clave,
        nombre: item.nombre,
        condicion: item.condicion,
        tags: item.tags,
        deprecated: item.deprecated,
        arguments: this.createArgumentsFrom(item.arguments),
      };
    },
    createArgumentsFrom(args: any[]): any[] {
      if (args?.length > 0) {
        const clonedArgs = JSON.parse(JSON.stringify(args));
        for (const argument of clonedArgs) {
          if (!argument.value) {
            //this.$set(argument, 'value', null);
            argument.value = null;
          }
        }
        return clonedArgs;
      }
      return [];
    },
    handleAddComponente(row: any): void {
      this.selected.push(row.item);
      this.originalSelected.push(this.mapToOriginalSelection(row.item));
      this.$emit('update:modelValue', this.originalSelected);
    },
    handleRemoveComponente(row: any) {
      if (row.detailsShowing) {
        row.toggleDetails();
      }
      const originalSelectedIndex = this.originalSelected.findIndex((element: any) => element.clave === row.item.clave);
      const selectedIndex = this.selected.findIndex((element: any) => element.clave === row.item.clave);
      this.originalSelected.splice(originalSelectedIndex, 1);
      this.selected.splice(selectedIndex, 1);
      this.$emit('update:modelValue', this.originalSelected);
    },
  },
});
