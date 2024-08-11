import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import PropertyCommons from '../commons/property.model';
@Component
export default class CardsListComponent extends mixins(PropertyCommons) {
  @Prop({ required: true, type: Array })
  public items!: Array<any>;

  @Prop({ default: false })
  public busy: boolean;

  @Prop({ default: 'id' })
  public trackedBy: string;

  @Prop({ default: 'id' })
  public paramId: string;

  @Prop()
  public editView: string;

  @Prop()
  public detailsView: string;

  @Prop({ default: '' })
  title: string;

  public removeIndex = null;

  public prepareRemove(instance: any): void {
    this.removeIndex = instance;
    this.$bvModal.show(this.id + '-removeEntityModal');
  }

  public remove(): void {
    this.$emit('remove', this.removeIndex);
    this.$bvModal.hide(this.id + '-removeEntityModal');
  }

  public edit(instance: any): void {
    this.$emit('edit', instance);
  }

  public isCardFooterVisible(currentItem): boolean {
    return this.isEditable(currentItem);
  }

  public isEditable(currentItem): boolean {
    return currentItem.router || currentItem?.buttons;
  }

  public hasEditableButtons(currentItem): boolean {
    return currentItem?.buttons?.length > 0;
  }

  public findFirstEditableDestino(currentItem): any {
    return currentItem.buttons[0].destino;
    //currentItem.buttons.
  }
}
