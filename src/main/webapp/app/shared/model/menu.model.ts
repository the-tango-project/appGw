import { type IComponente } from '@/shared/model/componente.model';
import { TipoMenu } from '@/shared/model/enumerations/tipo-menu.model';
import { TipoSolucion } from '@/shared/model/enumerations/tipo-solucion.model';
export interface IMenu {
  isAccionesActivated?: boolean | false;
  isPreviewActivated?: boolean | false;
  isCuestionarioActivated?: boolean | false;
  isAsignarRevisorActivated?: boolean | false;
  isAceptarRevisionActivated?: boolean | false;
  isComentariosActivated?: boolean | false;
  isAgregarComentariosActivated?: boolean | false;
  isReadOnly?: boolean | false;
  isOtrasRevisionesActivated?: boolean | false;
  tipoMenu?: TipoMenu | null;
  componentes?: IComponente[] | null;
  revisionTipoMenu?: TipoMenu | null;
  revisionComponentes?: IComponente[] | null;
}

export class Menu implements IMenu {
  constructor(
    public isAccionesActivated?: boolean | false,
    public isPreviewActivated?: boolean | false,
    public isCuestionarioActivated?: boolean | false,
    public isAsignarRevisorActivated?: boolean | false,
    public isAceptarRevisionActivated?: boolean | false,
    public isComentariosActivated?: boolean | false,
    public isReadOnly?: boolean | false,
    public isAgregarComentariosActivated?: boolean | false,
    public isOtrasRevisionesActivated?: boolean | false,
    public tipoMenu?: TipoMenu | null,
    public componentes?: IComponente[] | null,
    public revisionTipoMenu?: TipoMenu | null,
    public revisionComponentes?: IComponente[] | null,
  ) {
    this.componentes = this.componentes ? this.componentes : [];
    this.revisionComponentes = this.revisionComponentes ? this.revisionComponentes : [];
  }
}

export class MenuFactory {
  static getDefaultConfig(solucion) {
    const menu = new Menu();
    menu.isReadOnly = true;
    menu.isAccionesActivated = false;
    menu.isPreviewActivated = false;
    menu.isCuestionarioActivated = false;
    menu.isAsignarRevisorActivated = false;
    menu.isAceptarRevisionActivated = false;
    menu.isComentariosActivated = false;
    menu.isAgregarComentariosActivated = false;
    menu.isOtrasRevisionesActivated = false;
    menu.tipoMenu = solucion.tipoMenu ? solucion.tipoMenu : TipoMenu.STEPPER;
    menu.componentes = JSON.parse(JSON.stringify(solucion.componentes));
    menu.revisionTipoMenu = TipoMenu.STEPPER;
    menu.revisionComponentes = [];
    return menu;
  }
  static configDefaultMenuFromSolucion(solucion): IMenu {
    const menu = MenuFactory.getDefaultConfig(solucion);
    return menu;
  }

  static getSolicitanteMenu(solucion): IMenu {
    const menu = MenuFactory.getDefaultConfig(solucion);
    menu.isAccionesActivated = true;
    menu.isComentariosActivated = true;
    return menu;
  }

  static getRevisionInvitacionMenu(solucion): IMenu {
    const menu = MenuFactory.getDefaultConfig(solucion);
    menu.isAceptarRevisionActivated = true;
    return menu;
  }

  static getAsignarRevisorMenu(solucion): IMenu {
    const menu = MenuFactory.getDefaultConfig(solucion);
    menu.isAsignarRevisorActivated =
      solucion.tipo !== TipoSolucion.ACREDITACIONES || solucion.tipo !== TipoSolucion.ACREDITACIONES_SIN_INST;
    menu.isAccionesActivated = true;
    menu.isComentariosActivated = true;
    return menu;
  }

  static getAdminiSolucionMenu(solucion): IMenu {
    const menu = MenuFactory.getDefaultConfig(solucion);
    menu.isAccionesActivated = true;
    menu.isPreviewActivated = true;
    menu.isReadOnly = false;
    return menu;
  }

  /**
   *
   * Se utiliza en la configuracion de una Solución
   * para mostrar las configuraciones que se tienen
   * por cada revisión configurada
   *
   */
  static getConfigRevisorMenu(solucion, isOtrasRevisionesActivated): IMenu {
    const menu = MenuFactory.getDefaultConfig(solucion);
    menu.isPreviewActivated = true;
    menu.isOtrasRevisionesActivated = isOtrasRevisionesActivated ?? false;
    menu.isCuestionarioActivated = true;
    menu.isReadOnly = false;
    return menu;
  }

  /**
   *
   * Se utiliza en la pantalla del revisor para cargar
   * el menú con sus respectivos compoenntes
   *
   */
  static getRevisionMenu(solucion, revision): IMenu {
    const menu = MenuFactory.getDefaultConfig(solucion);
    menu.isCuestionarioActivated = true;
    menu.isOtrasRevisionesActivated = revision.verOtrasRevisiones;
    menu.revisionTipoMenu = revision.tipoMenu;
    menu.revisionComponentes = revision.componentes;
    return menu;
  }
}
