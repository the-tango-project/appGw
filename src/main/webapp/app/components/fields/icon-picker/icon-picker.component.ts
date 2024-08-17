import { computed, defineComponent, inject, ref, type Ref, defineModel } from 'vue';
import { useCoreProps } from '@/composables/coreProps';
const { coreProps } = useCoreProps();

const icons = [
  'asterisk',
  'plus',
  'cloud',
  'envelope',
  'pencil',
  'search',
  'heart',
  'star',
  'film',
  'zoom-in',
  'zoom-out',
  'trash',
  'file',
  'download',
  'upload',
  'inbox',
  'play-circle',
  'lock',
  'flag',
  'headphones',
  'volume-off',
  'volume-down',
  'volume-up',
  'tag',
  'tags',
  'book',
  'bookmark',
  'camera',
  'share',
  'check',
  'play',
  'pause',
  'stop',
  'forward',
  'eject',
  'chevron-left',
  'chevron-right',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-down',
  'calendar',
  'chevron-up',
  'chevron-down',
  'hdd',
  'globe',
  'wrench',
  'filter',
  'briefcase',
  'fullscreen',
  'paperclip',
  'link',
  'phone',
  'record',
  'save',
  'credit-card',
  'cloud-download',
  'cloud-upload',
  'hourglass',
  'menu-down',
  'menu-up',
];

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'IconPicker',
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: String,
      default: () => '',
    },
    ...coreProps,
  },
  setup(props, { emit }) {
    const selected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    const iconsOptions = ref(icons);
    const iconSelectorModal: Ref<string> = ref(null);
    const searchedIcon: Ref<string> = ref(null);
    return { selected, iconsOptions, iconSelectorModal, searchedIcon };
  },
  methods: {
    handleSelectIcon(icon: String): void {
      this.selected = icon;
      this.iconSelectorModal.hide();
    },
    cancelHandler(): void {
      this.iconSelectorModal.hide();
    },
    handleAddFindedIcon(): void {
      this.selected = this.searchedIcon;
      this.searchedIcon = null;
      this.iconSelectorModal.hide();
    },
  },
});
