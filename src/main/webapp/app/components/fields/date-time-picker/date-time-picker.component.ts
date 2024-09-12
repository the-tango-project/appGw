import { computed, defineComponent, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import * as dateUtils from '@/shared/date/date-utils';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'DateTimePickerComponent',
  components: {
    'vue-date-picker': VueDatePicker,
  },
  props: {
    modelValue: {
      type: String,
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
    const originalDateTime = computed(() => props.modelValue);
    const dateTime = computed<Date | null>({
      get: () => new Date(props.modelValue),
      set: value => {
        emit('update:modelValue', dateUtils.updateInstantField(value));
        emit('change', value);
      },
    });

    return {
      originalDateTime,
      dateTime,
      dateUtils,
    };
  },
  methods: {
    convertDateTimeFromServer(dateTimeFromServer: any) {
      return this.dateUtils.convertDateTimeFromServer(dateTimeFromServer);
    },
    updateInstantField(event: any): void {
      if (event.target?.value) {
        this.dateTime = event.target.value;
      } else {
        this.dateTime = null;
      }
    },
  },
});
