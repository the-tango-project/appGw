import { MenuElement } from '@/shared/model/enumerations/menu-element.model';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { CustomComponente } from '@/shared/model/enumerations/custom-componente.model';
import { type IConfiguracion, Configuracion } from '@/shared/model/configuracion/configuracion.model';
export interface IComponente {
  orden?: number | null;
  titulo?: string | null;
  descripcion?: string | null;
  formId?: string | null;
  icon?: string | null;
  tipo?: TipoComponente | null;
  path?: string | null;
  menuName?: MenuElement | null;
  configuracion?: IConfiguracion | null;
}

export class Componente implements IComponente {
  constructor(
    public orden?: number | null,
    public titulo?: string | null,
    public descripcion?: string | null,
    public formId?: string | null,
    public icon?: string | null,
    public tipo?: TipoComponente | null,
    public path?: string | null,
    public menuName?: MenuElement | null,
    public configuracion?: IConfiguracion | null,
  ) {
    this.configuracion = this.configuracion ? this.configuracion : new Configuracion();
  }
}

export class ComponenteFactory {
  static getAcciones() {
    const componente = new Componente();
    componente.formId = CustomComponente.ACCIONES;
    componente.titulo = 'Acciones';
    componente.descripcion = 'acciones';
    componente.orden = 1000;
    componente.icon = 'no-icon';
    componente.path = 'acciones/compponent';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }

  static getContestarEncuesta() {
    const componente = new Componente();
    componente.formId = CustomComponente.CONTESTAR_ENCUESTA;
    componente.titulo = 'Cuestionario';
    componente.descripcion = 'cuestionarioSolicitud';
    componente.orden = 2000;
    componente.icon = 'no-icon';
    componente.path = 'cuestionario/compponent';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }

  static getEnviarEncuesta() {
    const componente = new Componente();
    componente.formId = CustomComponente.ENVIAR_ENCUESTA;
    componente.titulo = 'Enviar revisión';
    componente.descripcion = 'enviarRevisión';
    componente.orden = 1001;
    componente.icon = 'no-icon';
    componente.path = 'send/review/compponent';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }

  static getAsignarRevisor() {
    const componente = new Componente();
    componente.formId = CustomComponente.ASIGNAR_REVISOR;
    componente.titulo = 'Asignar revisor';
    componente.descripcion = 'asignarRevisor';
    componente.orden = 1002;
    componente.icon = 'no-icon';
    componente.path = 'assign/review/compponent';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }

  static getAceptarRevisar() {
    const componente = new Componente();
    componente.formId = CustomComponente.ACEPTAR_REVISAR;
    componente.titulo = 'Aceptar Revision';
    componente.descripcion = 'aceptarRevision';
    componente.orden = 1003;
    componente.icon = 'no-icon';
    componente.path = 'accept/review/compponent';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }

  static getComentarios() {
    const componente = new Componente();
    componente.formId = CustomComponente.COMENTARIOS;
    componente.titulo = 'Comentarios';
    componente.descripcion = 'comentarios';
    componente.orden = 1005;
    componente.icon = 'no-icon';
    componente.path = 'view/comentarios';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }

  static getAgregarComentarios() {
    const componente = new Componente();
    componente.formId = CustomComponente.AGREGAR_COMENTARIOS;
    componente.titulo = 'Agregar comentarios';
    componente.descripcion = 'Agregar comentarios';
    componente.orden = 1006;
    componente.icon = 'no-icon';
    componente.path = 'view/agregar-comentarios';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }

  static getLoadOtrasRevisiones() {
    const componente = new Componente();
    componente.formId = CustomComponente.OTRAS_REVISIONES;
    componente.titulo = 'Revisiones realizadas';
    componente.descripcion = 'Revisiones realizadas';
    componente.orden = 1007;
    componente.icon = 'no-icon';
    componente.path = 'view/review-done';
    componente.tipo = TipoComponente.CUSTOM;
    return componente;
  }
}
