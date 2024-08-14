import { type IComponente } from '@/shared/model/componente.model';
import { type IButton } from '@/shared/model/button.model';
import { type IColumna } from '@/shared/model/columna.model';
import { type IMascaraEstado } from '@/shared/model/mascara-estado.model';
import { type ISolucionConfiguracion, SolucionConfiguracion } from '@/shared/model/solucion-configuracion.model';

import { EstadoSolucion } from '@/shared/model/enumerations/estado-solucion.model';
import { TipoSolucion } from '@/shared/model/enumerations/tipo-solucion.model';
import { type IRule } from '@/shared/model/rule.model';
import { type IAutoridad } from '@/shared/model/autoridad.model';
import { type IProceso, Proceso } from '@/shared/model/proceso/proceso.model';
import { TipoMenu } from './enumerations/tipo-menu.model';
import { MailTemplate } from '@/shared/util/mail-template';
import { TipoAcceso } from './enumerations/tipo-acceso.model';

export interface ICalendario {
  fechaInicio?: Date | null;
  fechaFinSolicitud?: Date | null;
  fechaFinRevision?: Date | null;
  fechaFinReconsideracion?: Date | null;
}

export class Calendario implements ICalendario {
  constructor(
    public fechaInicio?: Date | null,
    public fechaFinSolicitud?: Date | null,
    public fechaFinRevision?: Date | null,
    public fechaFinReconsideracion?: Date | null,
  ) {}
}

export interface IMensaje {
  bienvenida?: string | null;
  terminos?: string | null;
  bienvenidaRevision?: string | null;
  terminosRevision?: string | null;
  bienvenidaOperador?: string | null;
}

export class Mensaje implements IMensaje {
  constructor(
    public bienvenida?: string | null,
    public terminos?: string | null,
    public bienvenidaRevision?: string | null,
    public terminosRevision?: string | null,
    public bienvenidaOperador?: string | null,
  ) {}
}

export interface IVistaResumen {
  icon?: string | null;
  titulo?: string | null;
  descripcion?: string | null;
  pieDePagina?: string | null;
  columnas?: IColumna[] | null;
  buttons?: IButton[] | null;
  insignias?: string[] | null;
  mascaraEstados?: IMascaraEstado[] | null;
}

export class VistaResumen implements IVistaResumen {
  constructor(
    public icon?: string | null,
    public titulo?: string | null,
    public descripcion?: string | null,
    public pieDePagina?: string | null,
    public columnas?: IColumna[] | null,
    public buttons?: IButton[] | null,
    public insignias?: string[] | null,
    public mascaraEstados?: IMascaraEstado[] | null,
  ) {
    this.icon = this.icon ? this.icon : 'icon-solicitud';
    this.mascaraEstados = this.mascaraEstados ? this.mascaraEstados : [];
    this.columnas = this.columnas ? this.columnas : [];
    this.buttons = this.buttons ? this.buttons : [];
  }
}

export interface ISolucion {
  id?: string;
  titulo?: string | null;
  descripcion?: string | null;
  tipo?: TipoSolucion | null;
  tipoMenu?: TipoMenu | null;
  estado?: EstadoSolucion | null;
  componentes?: IComponente[] | null;
  mensaje?: Mensaje | null;
  tags?: string[] | null;
  calendario?: ICalendario | null;
  proceso?: IProceso | null;
  cuestionario?: any;
  reglas?: IRule[] | null;
  autoridades?: IAutoridad[] | null;
  vistaResumen?: VistaResumen | null;
  version?: number | null;
  visible?: boolean | null;
  mailTemplate?: string | null;
  configuracion?: ISolucionConfiguracion | null;
  params?: any;
  tipoAcceso?: TipoAcceso;
}

export class Solucion implements ISolucion {
  constructor(
    public id?: string,
    public titulo?: string | null,
    public descripcion?: string | null,
    public tipo?: TipoSolucion | null,
    public tipoMenu?: TipoMenu | null,
    public estado?: EstadoSolucion | null,
    public componentes?: IComponente[] | null,
    public mensaje?: Mensaje | null,
    public tags?: string[] | null,
    public calendario?: ICalendario | null,
    public proceso?: IProceso | null,
    public cuestionario?: any,
    public reglas?: IRule[] | null,
    public autoridades?: IAutoridad[] | null,
    public vistaResumen?: VistaResumen | null,
    public version?: number | null,
    public visible?: boolean | null,
    public mailTemplate?: string | null,
    public configuracion?: ISolucionConfiguracion | null,
    public params?: any,
    public tipoAcceso?: TipoAcceso,
  ) {
    this.cuestionario = this.cuestionario ? this.cuestionario : {};
    this.mensaje = this.mensaje ? this.mensaje : new Mensaje();
    this.calendario = this.calendario ? this.calendario : new Calendario();
    this.proceso = this.proceso ? this.proceso : new Proceso();
    this.configuracion = this.configuracion ? this.configuracion : new SolucionConfiguracion();
    this.componentes = this.componentes ? this.componentes : [];
    this.reglas = this.reglas ? this.reglas : [];
    this.tags = this.tags ? this.tags : [];
    this.autoridades = this.autoridades ? this.autoridades : [];
    this.params = this.params ? this.params : {};
    this.mailTemplate = this.mailTemplate ? this.mailTemplate : MailTemplate.TEMPLATE;
  }
}
