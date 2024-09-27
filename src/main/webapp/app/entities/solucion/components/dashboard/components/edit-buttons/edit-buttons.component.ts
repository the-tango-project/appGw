import { computed, defineComponent, ref, type Ref } from 'vue';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import type { IOption } from '@/shared/model/ui/option.model';
import type { IButton } from '@/shared/model/button.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'EditButton',
  props: {
    modelValue: {
      type: Array<IButton>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectOptions = useSelectOptions();
    const authorityOptions: Ref<IOption[]> = ref(selectOptions.authorityOptions);
    const currentButtonIndex: Ref<number> = ref(-1);
    const editarButtonModal = ref<any>(null);

    const currentButtonEditable: Ref<IButton | null> = ref(null);
    const buttons = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      editarButtonModal,
      authorityOptions,
      currentButtonEditable,
      currentButtonIndex,
      buttons,
    };
  },
  methods: {
    openEditButtonModalHandler(buttonIndex: number, button: IButton) {
      this.currentButtonEditable = { ...button };
      this.currentButtonIndex = buttonIndex;
      this.editarButtonModal.show();
    },
    saveButtonsHandler() {
      if (this.currentButtonEditable) {
        this.buttons.splice(this.currentButtonIndex, 1, this.currentButtonEditable);
        this.editarButtonModal.hide();
      }
    },
  },
});
