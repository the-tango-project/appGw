import { computed, defineComponent, inject, ref, type Ref, defineModel, watch } from 'vue';
import { useCoreProps } from '@/composables/coreProps';
import type { IColumn } from '@/components/card-list/CardItem.model';
import type { IOption } from '@/shared/model/ui/option.model';
import { useI18n } from 'vue-i18n';
const { coreProps } = useCoreProps();

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'InputTags',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array<String>,
      default: () => [],
    },
    ...coreProps,
  },
  setup(props, { emit }) {
    const { t: t$ } = useI18n();
    const selectOptionPlaceholder: Ref<String> = ref(t$('global.form.selecttags.placeholder').toString());
    const selectFormKey = ref(0);

    const theModel = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    const formVueOptions = ref([]);

    if (props.placeholder) {
      selectOptionPlaceholder.value = props.placeholder;
    }

    formVueOptions.value = theModel.value.map(option => {
      return { value: option, label: option };
    });

    // This watch is necessary for refresh the options values int the vueform-multi-select component and could show the the tags properly
    watch([theModel], async newValue => {
      formVueOptions.value = theModel.value.map(tag => {
        return { value: tag, label: tag };
      });
      selectFormKey.value = selectFormKey.value + 1;
    });

    return { theModel, formVueOptions, selectOptionPlaceholder, selectFormKey };
  },
});
