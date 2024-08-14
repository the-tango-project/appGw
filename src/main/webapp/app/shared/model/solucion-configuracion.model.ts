export interface ISolucionConfiguracion {
  maxNumberOfSolicitudesPerUser?: number | null;
}

export class SolucionConfiguracion implements ISolucionConfiguracion {
  constructor(public maxNumberOfSolicitudesPerUser?: number | null) {}
}
