import { computed, defineComponent, ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

//https://github.com/tinymce/tinymce-vue
//https://github.com/JiHong88/awesome-wysiwyg?tab=readme-ov-file
//https://tiptap.dev/docs
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
    const options = ref({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
        ],
      },
      contentType: 'html',
      readOnly: false,
      theme: 'bubble',
    });

    const text = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    const editor = computed(() => (editorRef.value ? editorRef.value.getQuill() : null));
    return {
      text,
      editorRef,
      editor,
      options,
    };
  },
  methods: {
    addVariable(variable: any) {
      const index = this.editor.selection.savedRange.index;
      this.editor.insertText(index, ' [[${' + variable.path + '}]] ');
    },
  },
});
