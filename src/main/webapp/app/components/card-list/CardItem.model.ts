import { type IButton } from '@/shared/model/button.model';

export interface ITo {
  name: string | null;
  params: any;
}

export interface IEdit {
  to: ITo | null;
  nameBto: string | null;
  icon: string | null;
}

export interface IRouter {
  edit?: IEdit | null;
}

export interface ICardItem {
  title?: string | null;
  router?: IRouter | null;
  buttons?: IButton[] | null;
}

export class Router implements IRouter {
  constructor(public edit?: IEdit | null) {}
}

export class Edit implements IEdit {
  constructor(
    public to: ITo | null,
    public nameBto: string | null,
    public icon: string | null,
  ) {}
}

export class To implements ITo {
  constructor(
    public name: string | null,
    public params: any,
  ) {}
}
export class CardItem implements ICardItem {
  constructor(
    public title?: string | null,
    public router?: IRouter | null,
    public buttons?: IButton[] | null,
  ) {}
}
