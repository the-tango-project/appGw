import { type IRespuesta } from '@/shared/model/respuesta.model';
import { type IRevisor } from '@/shared/model/revisor.model';
import { type ISolicitudResumen } from '@/shared/model/solicitud-resumen.model';

import { EstadoRevision } from '@/shared/model/enumerations/estado-revision.model';
export interface IRevision {
  id?: string;
  evaluacionId?: string | null;
  estado?: EstadoRevision | null;
  respuesta?: IRespuesta | null;
  revisor?: IRevisor | null;
  solicitudResumen?: ISolicitudResumen | null;
}

export class Revision implements IRevision {
  constructor(
    public id?: string,
    public evaluacionId?: string,
    public estado?: EstadoRevision | null,
    public respuesta?: IRespuesta | null,
    public revisor?: IRevisor | null,
    public solicitudResumen?: ISolicitudResumen | null,
  ) {}
}
