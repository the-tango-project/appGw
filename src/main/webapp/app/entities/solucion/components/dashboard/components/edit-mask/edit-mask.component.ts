import { computed, defineComponent, type Ref, ref } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';
import type { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import { MascaraEstado } from '@/shared/model/mascara-estado.model';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'EditMask',
  props: {
    modelValue: {
      type: Array<MascaraEstado>,
      required: true,
    },
  },
  setup(props, { emit }) {
    //catalogs
    const selectOptions = useSelectOptions();

    const authorityOptions: Ref<IOption[]> = ref(selectOptions.authorityOptions);
    const estadoSolicitudOptions: Ref<IOption[]> = ref(selectOptions.stateOptions);
    const mascara: Ref<MascaraEstado> = ref(new MascaraEstado());

    const mascaras = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      mascara,
      mascaras,
      authorityOptions,
      estadoSolicitudOptions,
    };
  },
  methods: {
    filterRol(rol: RolAutoridad) {
      return this.mascaras.filter(mascara => mascara.rol === rol);
    },
    handleAddMascara(rol: RolAutoridad) {
      this.mascara.id = uuidv4();
      this.mascara.rol = rol;
      this.mascaras.push(this.mascara);
      this.mascara = new MascaraEstado();
    },
    handlePrepareToRemove(currentMascara: MascaraEstado) {
      const indexToDelete = this.mascaras.findIndex(mascara => mascara.id === currentMascara.id);
      this.mascaras.splice(indexToDelete, 1);
    },
    clickHandler() {
      this.mascara = new MascaraEstado();
    },
    isValid(rol: RolAutoridad): boolean {
      if (this.mascara?.estado && this.mascara?.mascara) {
        const index = this.mascaras.findIndex(
          mask => mask.rol === rol && mask.estado === this.mascara.estado && mask.mascara === this.mascara.mascara,
        );
        return index === -1;
      } else {
        return true;
      }
    },
  },
});
