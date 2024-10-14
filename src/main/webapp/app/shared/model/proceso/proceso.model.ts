import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { type IEstado } from '@/shared/model/proceso/estado.model';
import type { RolAutoridad } from '../enumerations/rol-autoridad.model';

export interface IProceso {
  inicio?: EstadoSolicitud | null;
  estados?: IEstado[] | null;
  roles?: RolAutoridad[] | null;
}

export class Proceso implements IProceso {
  constructor(
    public inicio?: EstadoSolicitud | null,
    public estados?: IEstado[] | null,
    public roles?: RolAutoridad[] | null,
  ) {
    this.estados = this.estados ? this.estados : [];
  }
}
