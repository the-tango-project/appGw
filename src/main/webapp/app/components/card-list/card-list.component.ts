import { defineComponent } from 'vue';
import { type ICardItem, type IRouter } from './CardItem.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CardList',
  emits: ['add-element'],
  props: {
    items: Array<ICardItem>,
    title: String,
    show: { type: Boolean, default: true },
  },
  setup() {},
  methods: {
    isEditable(item: ICardItem): boolean {
      if (item?.buttons && item.buttons.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    hasEditableButtons(item: ICardItem): boolean {
      return item?.buttons?.length !== undefined && item?.buttons?.length > 0;
    },
    findFirstEditableDestino(item: ICardItem): IRouter | string | null {
      if (item?.buttons?.length !== undefined && item?.buttons?.length > 0) {
        return item?.buttons[0]?.to !== undefined ? item.buttons[0].to : '';
      } else {
        return '';
      }
    },
    isCardFooterVisible(item: ICardItem): boolean {
      return this.isEditable(item);
    },
    addHandler(): void {
      this.$emit('add-element');
    },
  },
});
