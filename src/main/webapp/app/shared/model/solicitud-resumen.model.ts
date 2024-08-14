import { type IRevision } from '@/shared/model/revision.model';

export interface ISolicitudResumen {
  solucionId?: string | null;
  solicitudId?: string | null;
  nombre?: string | null;
}

export class SolicitudResumen implements ISolicitudResumen {
  constructor(
    public solucionId?: string | null,
    public solicitudId?: string | null,
    public nombre?: string | null,
  ) {}
}
