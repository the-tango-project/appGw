import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { type ITransicion } from '@/shared/model/proceso/transicion.model';
import { type IPermiso } from '@/shared/model/proceso/permiso.model';

export interface IEstado {
  nombre?: EstadoSolicitud | null;
  transiciones?: ITransicion[] | null;
  permisos?: IPermiso[] | null;
}

export class Estado implements IEstado {
  constructor(
    public nombre?: EstadoSolicitud | null,
    public transiciones?: ITransicion[] | null,
    public permisos?: IPermiso[] | null,
  ) {
    this.transiciones = this.transiciones ? this.transiciones : [];
    this.permisos = this.permisos ? this.permisos : [];
  }
}
