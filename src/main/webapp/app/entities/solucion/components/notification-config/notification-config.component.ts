import { computed, defineComponent, type PropType, type Ref, ref } from 'vue';
import type { Notificacion } from '@/shared/model/notificacion.model';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'NotificationConfig',
  props: {
    modelValue: {
      type: Object as PropType<Notificacion>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const variableCorreos: Ref<any[]> = ref([{ nombre: 'Solicitante', path: 'solicitud.solicitante.correo' }]);
    const variables: Ref<any[]> = ref([
      { nombre: 'Nombre del solicitante', path: 'solicitud.solicitante.nombre' },
      { nombre: 'Apellido paterno del solicitante', path: 'solicitud.solicitante.apellidoPaterno' },
      { nombre: 'Apellido materno del solicitante', path: 'solicitud.solicitante.apellidoMaterno' },
      { nombre: 'Correo del solicitante', path: 'solicitud.solicitante.correo' },
    ]);

    const mensajeNotificacion = ref<any>(null);

    const notificacion = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return { notificacion, variableCorreos, variables, mensajeNotificacion };
  },
  methods: {
    addCorreoToPara(variable: any) {
      if (this.notificacion.para) {
        this.notificacion.para.push('{{ ' + variable.path + ' }}');
      }
    },
    addCorreoToCc(variable: any) {
      if (this.notificacion.cc) {
        this.notificacion.cc.push('{{ ' + variable.path + ' }}');
      }
    },
    addCorreoToCco(variable: any) {
      if (this.notificacion.cco) {
        this.notificacion.cco.push('{{ ' + variable.path + ' }}');
      }
    },
    addVariable(variable: any) {
      this.mensajeNotificacion.addVariable(variable);
    },
    addContent() {
      this.notificacion.activada = true;
    },
  },
});
