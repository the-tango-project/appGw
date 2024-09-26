import { computed, defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useCoreProps } from '@/composables/coreProps';
const { coreProps } = useCoreProps();
import type { CmComponentRef } from 'codemirror-editor-vue3';
import type { Editor, EditorConfiguration } from 'codemirror';

import 'codemirror/lib/codemirror.css';
export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'CodeEditor',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const code = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    const cmRef = ref<CmComponentRef>();
    const cmOptions: EditorConfiguration = {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      foldGutter: true,
      styleSelectedText: true,
      mode: props.lang,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      hintOptions: {
        completeSingle: true,
      },
    };
    const onChange = (val: string, cm: Editor) => {
      console.log(val);
      console.log(cm.getValue());
    };

    const onInput = (val: string) => {
      console.log(val);
    };

    const onReady = (cm: Editor) => {
      cm.focus();
      setTimeout(function () {
        cm.refresh();
      }, 10);
    };

    onMounted(() => {
      setTimeout(() => {
        cmRef.value?.refresh();
      }, 1000);

      setTimeout(() => {
        cmRef.value?.resize(300, 200);
      }, 2000);

      setTimeout(() => {
        cmRef.value?.cminstance.isClean();
      }, 3000);
    });

    onUnmounted(() => {
      cmRef.value?.destroy();
    });
    return { code, cmOptions, onChange, onInput, onReady };
  },
});
