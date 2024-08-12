import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import { type ICardItem, CardItem } from '@/components/card-list/CardItem.model';
import { faker } from '@faker-js/faker';
import { ButtonFactory } from '@/shared/model/button.model';
import { type IRouter, Router, Edit, type ITo, To } from '@/components/card-list/CardItem.model';

export class DataFaker {
  static ICONS = ['alarm', 'archive', 'pause-circle', 'people', 'trash'];
  static fakeRolAutoridad(): RolAutoridad {
    const keys = Object.keys(RolAutoridad);
    const random = Math.floor(Math.random() * 100) % keys.length;
    return keys[random] as RolAutoridad;
  }

  static fakeCardItem(): ICardItem {
    const item: ICardItem = new CardItem();
    item.title = faker.word.noun();
    item.router = this.fakeRouter();
    item.buttons = ButtonFactory.getDefaultButtons();
    return item;
  }

  static fakeRouter(): IRouter {
    const router: IRouter = new Router();
    router.edit = new Edit();
    router.edit.icon = this.randomIcon();
    router.edit.nameBto = faker.word.verb() + ' ' + faker.word.noun();
    router.edit.to = this.fakeTo();
    return router;
  }
  static fakeTo(): ITo {
    return new To('Solicitud', { solicitudId: faker.database.mongodbObjectId() });
  }
  static randomIcon(): string {
    const iconIndex = Math.floor(Math.random() * 100) % this.ICONS.length;
    return this.ICONS[iconIndex];
  }
}
