import { Button, type IButton, ButtonFactory } from '@/shared/model/button.model';
import type { ISolicitante, ISolicitud } from '@/shared/model/solicitud.model';

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
  badge?: string | null;
  variant?: string | null;
}

export class Badge implements IBadge {
  constructor(
    public id?: string | number,
    public badge?: string | null,
    public variant?: string | null,
  ) {}
}
export interface ITo {
  name?: string | null;
  params?: any;
}

export interface IEdit {
  to?: ITo | null;
  nameBto?: string | null;
  icon?: string | null;
}

export interface IRouter {
  edit?: IEdit | null;
}

export class Router implements IRouter {
  constructor(public edit?: IEdit | null) {}
}

export class Edit implements IEdit {
  constructor(
    public to?: ITo | null,
    public nameBto?: string | null,
    public icon?: string | null,
  ) {}
}

export class To implements ITo {
  constructor(
    public name?: string | null,
    public params?: any,
  ) {}
}

export interface ICardItem {
  id?: string | null;
  icon?: string | null;
  title?: string | null;
  router?: IRouter | null;
  buttons?: IButton[] | null;
  badge?: IBadge[] | null;
  description?: string | null;
  solicitante?: string | null;
  solicitud?: ISolicitud | null;
  columnas?: any | null;
  pieDePagina?: string | null;
  selected?: boolean | null;
  processInfo?: IProcessInfo | null;
}

export class CardItem implements ICardItem {
  constructor(
    public id?: string | null,
    public icon?: string | null,
    public title?: string | null,
    public router?: IRouter | null,
    public buttons?: IButton[] | null,
    public badge?: IBadge[] | null,
    public description?: string | null,
    public solicitante?: string | null,
    public solicitud?: ISolicitud | null,
    public columnas?: IColumn[] | null,
    public pieDePagina?: string | null,
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
