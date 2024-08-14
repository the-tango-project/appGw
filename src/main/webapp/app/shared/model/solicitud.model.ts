import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { EstadoRevision } from '@/shared/model/enumerations/estado-revision.model';

export interface ISolicitante {
  cvu?: string | null;
  nombre?: string | null;
  apellidoPaterno?: string | null;
  apellidoMaterno?: string | null;
}

export class Solicitante implements ISolicitante {
  constructor(
    public cvu?: string | null,
    public nombre?: string | null,
    public apellidoPaterno?: string | null,
    public apellidoMaterno?: string | null,
  ) {}
}
export interface IRevisorResumen {
  id?: string | null;
  evaluacionId?: string | null;
  cvu?: string | null;
  revisorId?: string | null;
  nombre?: string | null;
  estado?: EstadoRevision | null;
}

export class RevisorResumen implements IRevisorResumen {
  constructor(
    public id?: string | null,
    public evaluacionId?: string | null,
    public cvu?: string | null,
    public revisorId?: string | null,
    public nombre?: string | null,
    public estado?: EstadoRevision | null,
  ) {}
}

export interface ISolicitud {
  id?: string;
  nombre?: string | null;
  usuario?: string | null;
  solucionId?: string | null;
  estado?: EstadoSolicitud | null;
  revisores?: RevisorResumen[] | null;
  solicitante?: ISolicitante;
}

export class Solicitud implements ISolicitud {
  constructor(
    public id?: string,
    public nombre?: string | null,
    public usuario?: string | null,
    public solucionId?: string | null,
    public estado?: EstadoSolicitud | null,
    public revisores?: RevisorResumen[] | null,
    public solicitante?: ISolicitante,
  ) {
    this.revisores = this.revisores ? this.revisores : [];
  }
}
