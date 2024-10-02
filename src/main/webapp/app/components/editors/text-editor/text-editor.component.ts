import { computed, defineComponent, ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { faker } from '@faker-js/faker';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'TextEditorComponent',
  components: {
    'quill-editor': QuillEditor,
  },
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const editorRef = ref<any>(null);

    const text = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    const editor = computed(() => (editorRef.value ? editorRef.value.getQuill() : null));
    return {
      text,
      editorRef,
      editor,
    };
  },
  methods: {
    addVariable(variable: any) {
      const index = this.editor.selection.savedRange.index;
      this.editor.insertText(index, ' [[${' + variable.path + '}]] ');
    },
  },
});
