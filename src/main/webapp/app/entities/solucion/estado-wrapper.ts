import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import type { IEstado } from '@/shared/model/proceso/estado.model';

export interface IEstadoWrapper {
  oldName?: EstadoSolicitud | null;
  currentIndex?: number | null;
  state?: IEstado | null;
}

export class EstadoWrapper implements IEstadoWrapper {
  constructor(
    public oldName?: EstadoSolicitud | null,
    public currentIndex?: number | null,
    public state?: IEstado | null,
  ) {}
}
