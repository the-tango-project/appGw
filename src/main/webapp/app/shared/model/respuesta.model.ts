import { type IRevision } from '@/shared/model/revision.model';

export interface IRespuesta {
  nombre?: string | null;
  revision?: IRevision | null;
}

export class Respuesta implements IRespuesta {
  constructor(
    public nombre?: string | null,
    public revision?: IRevision | null,
  ) {}
}
