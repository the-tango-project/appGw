import { computed, defineComponent } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'TextEditorComponent',
  components: {
    'quill-editor': QuillEditor,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const text = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      text,
    };
  },
});
