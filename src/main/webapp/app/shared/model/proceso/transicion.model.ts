import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { Rule } from '@/shared/model/rule.model';
import { Action } from '@/shared/model/action.model';
import { Notificacion, type INotificacion } from '@/shared/model/notificacion.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { Diagram, type IDiagram } from '@/shared/model/proceso/diagram.model';
import type { IEstado } from './estado.model';

export interface ITransicion {
  accion?: TipoAccion | null;
  destino?: EstadoSolicitud | null;
  mensaje?: string | null;
  confirmar?: boolean | null;
  agregarComentario?: boolean | null;
  reglas?: Rule[] | null;
  acciones?: Action[] | null;
  notificacion?: INotificacion | null;
  diagram?: IDiagram | null;
}

export class Transicion implements ITransicion {
  constructor(
    public accion?: TipoAccion | null,
    public destino?: EstadoSolicitud | null,
    public mensaje?: string | null,
    public confirmar?: boolean | null,
    public agregarComentario?: boolean | null,
    public reglas?: Rule[] | null,
    public acciones?: Action[] | null,
    public notificacion?: INotificacion | null,
    public diagram?: IDiagram | null,
  ) {
    this.reglas = this.reglas ? this.reglas : [];
    this.acciones = this.acciones ? this.acciones : [];
    this.notificacion = this.notificacion ? this.notificacion : new Notificacion();
    this.diagram = this.diagram ? this.diagram : new Diagram();
  }
}

export class ITransitionWrapper {
  from?: IEstado | null;
  fromIndex?: number | null;
  to?: IEstado | null;
  toIndex?: number | null;
  transition?: ITransicion | null;
  transitionIndex?: number | null;
}

export class TransitionWrapper implements ITransitionWrapper {
  constructor(
    public from?: IEstado | null,
    public fromIndex?: number | null,
    public to?: IEstado | null,
    public toIndex?: number | null,
    public transition?: ITransicion | null,
    public transitionIndex?: number | null,
  ) {}
}
