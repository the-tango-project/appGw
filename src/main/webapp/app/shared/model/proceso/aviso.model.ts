import { TipoAviso } from '@/shared/model/enumerations/tipo-aviso.model';

export interface IAviso {
  titulo?: string | null;
  descripcion?: string | null;
  pieDePagina?: string | null;
  tipo?: TipoAviso | null;
}

export class Aviso implements IAviso {
  constructor(
    public titulo?: string | null,
    public descripcion?: string | null,
    public pieDePagina?: string | null,
    public tipo?: TipoAviso | null,
  ) {}
}
