import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { type IAviso, Aviso } from '@/shared/model/proceso/aviso.model';

export interface IPermiso {
  rol?: RolAutoridad | null;
  aviso?: IAviso | null;
  acciones?: TipoAccion[] | null;
}

export class Permiso implements IPermiso {
  constructor(
    public rol?: RolAutoridad | null,
    public aviso?: IAviso,
    public acciones?: TipoAccion[] | null,
  ) {
    this.acciones = this.acciones ? this.acciones : [];
    this.aviso = this.aviso ? this.aviso : new Aviso();
  }
}
