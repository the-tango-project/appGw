export interface IAction {
  clave?: string | null;
  nombre?: string | null;
}

export class Action implements IAction {
  constructor(
    public clave?: string | null,
    public nombre?: string | null,
  ) {}
}
