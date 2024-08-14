import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';

export interface IMascaraEstado {
  id?: string | null;
  rol?: RolAutoridad | null;
  estado?: EstadoSolicitud | null;
  mascara?: EstadoSolicitud | null;
  mascaraString?: string | null;
}

export class MascaraEstado implements IMascaraEstado {
  constructor(
    public id?: string | null,
    public rol?: RolAutoridad | null,
    public estado?: EstadoSolicitud | null,
    public mascara?: EstadoSolicitud | null,
    public mascaraString?: string | null,
  ) {}
}
