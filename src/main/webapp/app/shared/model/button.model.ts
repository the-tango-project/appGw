import { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';

export interface IButton {
  icon?: string | null;
  nombre?: string | null;
  destino?: string | null;
  tooltip?: string | null;
  roles?: RolAutoridad[] | null;
  expresion?: string | null;
}

export class Button implements IButton {
  constructor(
    public icon?: string | null,
    public nombre?: string | null,
    public destino?: string | null,
    public tooltip?: string | null,
    public roles?: RolAutoridad[] | null,
    public expresion?: string | null,
  ) {}
}

export class ButtonFactory {
  static getEditButton(): IButton {
    return new Button('editar', 'Editar', 'SolicitudEdit', 'Editar la solicitud', [RolAutoridad.SOLICITANTE], 'return true');
  }

  static getAdminButton() {
    return new Button(
      'comunidades',
      'Administrar',
      'SolicitudAsignarRevisor',
      'Administrar esta solicitud',
      [RolAutoridad.OPERADOR, RolAutoridad.SOPORTE],
      'return true',
    );
  }

  static getEvalButton() {
    return new Button('educacion', 'Evaluar', 'SolicitudEdit', 'Evaluar esta solicitud', [RolAutoridad.REVISOR], 'return true');
  }

  static getDefaultButtons() {
    return [this.getEditButton(), this.getAdminButton(), this.getEvalButton()];
  }
}
