import { type ISolicitud } from '@/shared/model/solicitud.model';
import { type IRevision } from '@/shared/model/revision.model';

export interface ISolicitudRevisiones {
  solicitud?: ISolicitud;
  revisiones?: IRevision[];
}

export class SolicitudRevisiones implements ISolicitudRevisiones {
  constructor(
    public solicitud?: ISolicitud,
    public revisiones?: IRevision[],
  ) {}
}
