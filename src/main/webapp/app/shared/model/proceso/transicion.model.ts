import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { Rule } from '@/shared/model/rule.model';
import { Action } from '@/shared/model/action.model';
import { Notificacion, type INotificacion } from '@/shared/model/notificacion.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';

export interface ITransicion {
  accion?: TipoAccion | null;
  destino?: EstadoSolicitud | null;
  mensaje?: string | null;
  confirmar?: boolean | null;
  agregarComentario?: boolean | null;
  reglas?: Rule[] | null;
  acciones?: Action[] | null;
  notificacion?: INotificacion | null;
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
  ) {
    this.reglas = this.reglas ? this.reglas : [];
    this.acciones = this.acciones ? this.acciones : [];
    this.notificacion = this.notificacion ? this.notificacion : new Notificacion();
  }
}
