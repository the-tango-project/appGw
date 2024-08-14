import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';

export interface IColumna {
  id?: string | null;
  nombre?: string | null;
  expresion?: string | null;
  path?: string | null;
  filter?: boolean | null;
  roles?: RolAutoridad[] | null;
}

export class Columna implements IColumna {
  constructor(
    public id?: string | null,
    public nombre?: string | null,
    public expresion?: string | null,
    public path?: string | null,
    public filter?: boolean | null,
    public roles?: RolAutoridad[],
  ) {}
}
