import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { type ITransicion } from '@/shared/model/proceso/transicion.model';
import { type IPermiso } from '@/shared/model/proceso/permiso.model';

export interface IDiagram {
  x?: number | null;
  y?: number | null;
  sourceId?: string | null;
  targetId?: string | null;
}

export class Diagram implements IDiagram {
  constructor(
    public x?: number | null,
    public y?: number | null,
    public sourceId?: string | null,
    public targetId?: string | null,
  ) {}
}
export interface IEstado {
  nombre?: EstadoSolicitud | null;
  transiciones?: ITransicion[] | null;
  permisos?: IPermiso[] | null;
  diagram?: IDiagram | null;
}

export class Estado implements IEstado {
  constructor(
    public nombre?: EstadoSolicitud | null,
    public transiciones?: ITransicion[] | null,
    public permisos?: IPermiso[] | null,
    public diagram?: IDiagram | null,
  ) {
    this.transiciones = this.transiciones ? this.transiciones : [];
    this.permisos = this.permisos ? this.permisos : [];
    this.diagram = this.diagram ? this.diagram : new Diagram();
  }
}
