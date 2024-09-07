import { computed, defineComponent, type Ref, ref } from 'vue';
import { Aviso } from '@/shared/model/proceso/aviso.model';
import { useSelectOptions } from '@/shared/composables/use-select-options';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'AvisoEditableComponent',
  props: {
    modelValue: {
      type: [Aviso, Object],
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();

    const tipoAvisoOptions = selectOptions.tipoAvisoOptions;
    const showPreview: Ref<boolean> = ref(false);

    const aviso = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      aviso,
      tipoAvisoOptions,
      showPreview,
    };
  },
  methods: {
    togglePreview(): void {
      this.showPreview = !this.showPreview;
    },
  },
});
