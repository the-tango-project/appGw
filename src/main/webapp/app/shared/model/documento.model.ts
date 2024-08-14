export interface IDocumento {
  id?: string;
}

export class Documento implements IDocumento {
  constructor(public id?: string) {}
}
