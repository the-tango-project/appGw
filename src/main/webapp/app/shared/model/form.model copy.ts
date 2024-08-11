import { MenuElement } from '@/shared/model/enumerations/menu-element.model';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';

export interface IForm {
  id?: string;
  menuName?: MenuElement | null;
  description?: string | null;
  title?: string | null;
  name?: string | null;
  path?: string | null;
  type?: string | null;
  icon?: string | null;
  tipo?: TipoComponente | null;
  display?: string | null;
  tags?: string[] | null;
  owner?: string | null;
  machineName?: string | null;
  html?: string | null;
  vuejs?: string | null;
}

export class Form implements IForm {
  constructor(
    public id?: string,
    public menuName?: MenuElement | null,
    public description?: string | null,
    public title?: string | null,
    public name?: string | null,
    public path?: string | null,
    public type?: string | null,
    public icon?: string | null,
    public tipo?: TipoComponente | null,
    public display?: string | null,
    public tags?: string[] | null,
    public owner?: string | null,
    public machineName?: string | null,
    public html?: string | null,
    public vuejs?: string | null,
  ) {
    this.tags = this.tags ? this.tags : [];
  }
}
