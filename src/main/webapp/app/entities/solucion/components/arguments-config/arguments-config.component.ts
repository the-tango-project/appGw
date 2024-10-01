import { computed, defineComponent, type PropType, type Ref, ref } from 'vue';
import { ArgumentType } from '@/shared/model/enumerations/argument-type.model';
import type { IArgument } from '@/shared/model/argument.model';
import { PropertyMapType } from '@/shared/model/enumerations/property-map-type.model';
import { PropertyMap } from '@/shared/model/property-map.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'ArgumentsConfig',
  props: { transitionElement: { type: Object as PropType<any>, required: true } },
  setup(props, { emit }) {
    const isSaved: Ref<boolean> = ref(false);
    const argumentTypeFields: Ref<string[]> = ref(['type', 'from', 'to', 'value', 'acciones']);

    const argumentos = computed<IArgument[]>(() => JSON.parse(JSON.stringify(props.transitionElement.arguments)));

    return {
      isSaved,
      argumentos,
      argumentTypeFields,
      ArgumentType,
    };
  },
  methods: {
    saveHandle() {
      this.isSaved = true;
      this.$emit('update', this.argumentos);
    },
    changeValueHandle() {
      this.isSaved = false;
    },
    addPropertyMapHandle(argumento: IArgument) {
      let currentArg = null;
      for (const arg of this.argumentos) {
        if (arg.name === argumento.name) {
          if (arg?.value?.length > 0) {
            arg.value = [];
          }
          currentArg = arg;
        }
      }

      const prop = new PropertyMap();
      prop.type = PropertyMapType.FROM_OBJECT;
      prop.from = 'solicitud.solicitante.cvu';
      prop.to = 'solicitud.solicitante.cvu';
      prop.value = '123456';
      if (currentArg) {
        currentArg.value.push(prop);
      }
    },
  },
});
