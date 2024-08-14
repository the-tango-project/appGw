import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';

export interface IAutoridad {
  usuarioId?: string | null;
  nombre?: string | null;
  apellidoMaterno?: string | null;
  apellidoPaterno?: string | null;
  cvu?: string | null;
  roles?: RolAutoridad[] | null;
}

export class Autoridad implements IAutoridad {
  constructor(
    public usuarioId?: string,
    public nombre?: string,
    public apellidoMaterno?: string | null,
    public apellidoPaterno?: string | null,
    public cvu?: string | null,
    public roles?: RolAutoridad[],
  ) {}
}
