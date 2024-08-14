import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import { Button, type IButton } from '@/shared/model/button.model';
import { type IBadge, type ICardItem, type IProcessInfo, Badge, CardItem, ProcessInfo } from '@/components/card-list/CardItem.model';
import { faker } from '@faker-js/faker';
import { ButtonFactory } from '@/shared/model/button.model';
import { type IRouter, Router, Edit, type ITo, To, type IColumn, Column } from '@/components/card-list/CardItem.model';
import { type ISolicitante, type ISolicitud, Solicitante, Solicitud } from '@/shared/model/solicitud.model';
import { EstadoSolicitud } from './enumerations/estado-solicitud.model';
export class DataFaker {
  static ICONS = ['alarm', 'archive', 'pause-circle', 'people', 'trash'];
  static VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'];
  static BUTTON_NAME = ['Edit', 'Details', 'Delete', 'Manage', 'Cancel', 'Admin'];
  static fakeRolAutoridad(): RolAutoridad {
    const keys = Object.keys(RolAutoridad);
    const random = Math.floor(Math.random() * 100) % keys.length;
    return keys[random] as RolAutoridad;
  }

  static fakeCardItem(): ICardItem {
    const item: ICardItem = new CardItem();
    item.id = faker.database.mongodbObjectId();
    item.icon = this.randomIcon();
    item.title = faker.word.noun();
    item.router = this.fakeRouter();
    item.buttons = [this.fakeButton(), this.fakeButton(), this.fakeButton()];
    item.badge = [this.fakeBadge(), this.fakeBadge(), this.fakeBadge(), this.fakeBadge(), this.fakeBadge()];
    item.columnas = this.fakeColumnas();
    item.description = faker.lorem.sentence();
    item.pieDePagina = faker.lorem.word();
    item.processInfo = this.fakeProcessInfo();
    item.selected = faker.datatype.boolean();
    const solicitante = this.fakeSolicitante();
    item.solicitante = solicitante.nombre + ' ' + solicitante.apellidoPaterno + ' ' + solicitante.apellidoMaterno;
    item.solicitud = this.fakeSolicitud();
    return item;
  }

  static fakeSolicitante(): ISolicitante {
    const solicitante = new Solicitante();
    solicitante.nombre = faker.person.firstName();
    solicitante.apellidoMaterno = faker.person.lastName();
    solicitante.apellidoPaterno = faker.person.lastName();
    solicitante.cvu = faker.database.mongodbObjectId();
    return solicitante;
  }
  static fakeSolicitud(): ISolicitud {
    const solicitud = new Solicitud();
    solicitud.id = faker.database.mongodbObjectId();
    solicitud.nombre = faker.word.noun();
    solicitud.solicitante = this.fakeSolicitante();
    solicitud.solucionId = faker.database.mongodbObjectId();
    solicitud.usuario = faker.internet.userName();
    solicitud.estado = EstadoSolicitud.ENVIADA;
    return solicitud;
  }
  static fakeProcessInfo(): IProcessInfo {
    const process = new ProcessInfo();
    process.hasErrors = faker.datatype.boolean();
    process.isFinished = faker.datatype.boolean();
    process.isProcessing = faker.datatype.boolean();
    process.isSelectable = faker.datatype.boolean();
    return process;
  }

  static fakeColumnas(): IColumn[] {
    return [this.fakeColumna(), this.fakeColumna(), this.fakeColumna()];
  }
  static fakeColumna(): IColumn {
    const column = new Column();
    column.title = faker.word.noun();
    column.description = faker.commerce.productDescription();
    column.hasAccess = faker.datatype.boolean();
    column.show = faker.datatype.boolean();
    return column;
  }

  static fakeButton(): IButton {
    const button = new Button();
    button.icon = this.randomIcon();
    button.nombre = this.randomButtonName();
    button.tooltip = faker.company.buzzPhrase();
    button.expresion = 'return true';
    button.roles = [RolAutoridad.OPERADOR, RolAutoridad.SISTEMA];
    button.destino = 'Showcase';
    return button;
  }

  static fakeRouter(): IRouter {
    const router: IRouter = new Router();
    router.edit = new Edit();
    router.edit.icon = this.randomIcon();
    router.edit.nameBto = faker.word.verb() + ' ' + faker.word.noun();
    router.edit.to = this.fakeTo();
    return router;
  }

  static fakeBadge(): IBadge {
    const badge = new Badge();
    badge.id = faker.database.mongodbObjectId();
    badge.badge = faker.word.noun();
    badge.variant = this.randomVariant();
    return badge;
  }

  static fakeTo(): ITo {
    return new To('Showcase', { solicitudId: faker.database.mongodbObjectId() });
  }
  static randomButtonName(): string {
    return this.BUTTON_NAME[this.randomIndex(this.BUTTON_NAME)];
  }
  static randomIcon(): string {
    return this.ICONS[this.randomIndex(this.ICONS)];
  }

  static randomVariant(): string {
    return this.VARIANTS[this.randomIndex(this.VARIANTS)];
  }

  static randomIndex(array: Array<any>) {
    return Math.floor(Math.random() * 100) % this.ICONS.length;
  }
}
