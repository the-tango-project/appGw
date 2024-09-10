import { computed, defineComponent, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'DateTimePickerComponent',
  components: {
    'vue-date-picker': VueDatePicker,
  },
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    timezone: {
      type: String,
      default: 'America/Mexico_City',
    },
    locale: {
      type: String,
      default: 'es-MX',
    },
  },
  setup(props, { emit }) {
    const date = ref(null);
    const dateTime = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value);
        emit('change', value);
      },
    });

    return {
      dateTime,
      date,
    };
  },
});
