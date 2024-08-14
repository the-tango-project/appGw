import { TipoComentario } from '@/shared/model/enumerations/tipo-comentario.model';
import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
export interface IComentario {
  id?: string;
  usuarioId?: string | null;
  text?: string;
  tipo?: TipoComentario | null;
  fechaCreacion?: Date | null;
  leido?: boolean | null;
  rol?: RolAutoridad | null;
  solicitudId?: string | null;
}

export class Comentario implements IComentario {
  constructor(
    public id?: string,
    public usuarioId?: string | null,
    public text?: string,
    public tipo?: TipoComentario | null,
    public fechaCreacion?: Date | null,
    public leido?: boolean | null,
    public rol?: RolAutoridad | null,
    public solicitudId?: string | null,
  ) {
    this.leido = this.leido ?? false;
  }
}
