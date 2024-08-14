export interface IFiltroParticipacion {
  solicitudId?: string | null;
  solucionId?: string | null;
  participacionId?: string | null;
  participanteCvu?: string | null;
  participanteLogin?: string | null;
  contenedorId?: string | null;
  dependenciaId?: string | null;
}

export class FiltroParticipacion implements IFiltroParticipacion {
  constructor(
    public solicitudId?: string | null,
    public solucionId?: string | null,
    public participacionId?: string | null,
    public participanteCvu?: string | null,
    public participanteLogin?: string | null,
    public contenedorId?: string | null,
    public dependenciaId?: string | null,
  ) {}
}
