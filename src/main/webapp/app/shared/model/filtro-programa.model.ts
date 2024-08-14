export interface IFiltroPrograma {
  programaId?: string | null;
  clave?: string | null;
  coordinadorCvu?: string | null;
  coordinadorLogin?: string | null;
}

export class FiltroPrograma implements IFiltroPrograma {
  constructor(
    public programaId?: string | null,
    public clave?: string | null,
    public coordinadorCvu?: string | null,
    public coordinadorLogin?: string | null,
  ) {}
}
