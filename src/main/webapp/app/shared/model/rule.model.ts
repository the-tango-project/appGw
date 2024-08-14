export interface IRule {
  clave?: string | null;
  nombre?: string | null;
  condicion?: string | null;
  tags?: string[] | null;
}

export class Rule implements IRule {
  constructor(
    public clave?: string | null,
    public nombre?: string | null,
    public condicion?: string | null,
    public tags?: string[] | null,
  ) {
    this.tags = this.tags ? this.tags : [];
  }
}
