import type { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import type { ISolicitante, ISolicitud } from '@/shared/model/solicitud.model';
import { faker } from '@faker-js/faker';

export interface IButton {
  name?: string | null;
  icon?: string | null;
  to?: IRouter | null;
  tooltip?: string | null;
  roles?: RolAutoridad[] | null;
  expresion?: string | null;
}

export class Button implements IButton {
  constructor(
    public name?: string | null,
    public icon?: string | null,
    public to?: IRouter | null,
    public tooltip?: string | null,
    public roles?: RolAutoridad[] | null,
    public expresion?: string | null,
  ) {}
}
export interface IProcessInfo {
  isProcessing?: boolean | null;
  hasErrors?: boolean | null;
  isFinished?: boolean | null;
  isSelectable?: boolean | null;
}

export class ProcessInfo implements IProcessInfo {
  constructor(
    public isProcessing?: boolean | null,
    public hasErrors?: boolean | null,
    public isFinished?: boolean | null,
    public isSelectable?: boolean | null,
  ) {}
}

export interface IBadge {
  id?: string | number;
  name?: string | null;
  variant?: string | null;
}

export class Badge implements IBadge {
  constructor(
    public id?: string | number,
    public name?: string | null,
    public variant?: string | null,
  ) {
    this.id = this.id ? this.id : faker.database.mongodbObjectId();
  }
}
export interface IRouter {
  name?: string | null;
  params?: any;
}

export class Router implements IRouter {
  constructor(
    public name?: string | null,
    public params?: any,
  ) {}
}

export interface ICardItem {
  id?: string | null;
  icon?: string | null;
  title?: string | null;
  buttons?: IButton[] | null;
  badge?: IBadge[] | null;
  description?: string | null;
  solicitante?: string | null;
  solicitud?: ISolicitud | null;
  columns?: IColumn[] | null;
  footer?: string | null;
  selected?: boolean | null;
  processInfo?: IProcessInfo | null;
}

export class CardItem implements ICardItem {
  constructor(
    public id?: string | null,
    public icon?: string | null,
    public title?: string | null,
    public buttons?: IButton[] | null,
    public badge?: IBadge[] | null,
    public description?: string | null,
    public solicitante?: string | null,
    public solicitud?: ISolicitud | null,
    public columns?: IColumn[] | null,
    public footer?: string | null,
    public selected?: boolean | null,
    public processInfo?: IProcessInfo | null,
  ) {}
}

export interface IColumn {
  title?: string | null;
  description?: string | null;
  show?: boolean | null;
  hasAccess?: boolean | null;
}
export class Column implements IColumn {
  constructor(
    public title?: string | null,
    public description?: string | null,
    public show?: boolean | null,
    public hasAccess?: boolean | null,
  ) {}
}
