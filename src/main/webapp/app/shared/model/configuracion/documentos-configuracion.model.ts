export interface IDocumentoConfiguracion {
  nombre?: string | null;
  nombrePropiedad?: string | null;
  requerido?: boolean | null;
  max?: number | null;
  mediaTypes?: string[] | null;
  expresion?: string | null;
}

export class DocumentoConfiguracion implements IDocumentoConfiguracion {
  constructor(
    public nombre?: string | null,
    public nombrePropiedad?: string | null,
    public requerido?: boolean | null,
    public max?: number | null,
    public mediaTypes?: string[],
    public expresion?: string | null,
  ) {
    this.mediaTypes = this.mediaTypes ? this.mediaTypes : [];
  }
}
