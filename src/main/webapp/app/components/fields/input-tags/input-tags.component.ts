import { computed, defineComponent, inject, ref, type Ref, defineModel } from 'vue';
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
    options: {
      type: Array<IOption>,
      required: true,
    },
    ...coreProps,
  },
  setup(props, { emit }) {
    const { t: t$ } = useI18n();
    let selectOptionPlaceholder: Ref<String> = ref(t$('global.form.selecttags.placeholder').toString());

    const theModel = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    if (props.placeholder) {
      selectOptionPlaceholder.value = props.placeholder;
    }

    const formVueOptions = props.options.map(option => {
      return { value: option.value, label: option.text };
    });

    return { theModel, formVueOptions, selectOptionPlaceholder };
  },
});
