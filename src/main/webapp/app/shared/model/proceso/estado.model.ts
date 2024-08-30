import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { type ITransicion } from '@/shared/model/proceso/transicion.model';
import { type IPermiso } from '@/shared/model/proceso/permiso.model';
import { Diagram, type IDiagram } from './diagram.model';

export interface IStateEditable {
  id?: EstadoSolicitud | null;
  state?: IEstado | null;
}

export class StateEditable implements IStateEditable {
  constructor(
    public id?: EstadoSolicitud | null,
    public state?: IEstado | null,
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
