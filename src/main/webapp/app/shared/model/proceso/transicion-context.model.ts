import { type ITransicion } from '@/shared/model/proceso/transicion.model';

export interface ITransicionContext {
  transicion?: ITransicion | null;
  mensaje?: string | null;
  solicitudId?: string | null;
  solucionId?: string | null;
}

export class TransicionContext implements ITransicionContext {
  constructor(
    public transicion?: ITransicion | null,
    public mensaje?: string | null,
    public solicitudId?: string | null,
    public solucionId?: string | null,
  ) {}
}
