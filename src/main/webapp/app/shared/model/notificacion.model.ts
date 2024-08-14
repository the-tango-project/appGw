export interface INotificacion {
  de?: string | null;
  para?: string[] | null;
  cc?: string[] | null;
  asunto?: string | null;
  mensaje?: string | null;
  activada?: boolean | null;
  enviada?: boolean | null;
  fechaDeEnvio?: Date | null;
}

export class Notificacion implements INotificacion {
  constructor(
    public de?: string | null,
    public para?: string[] | null,
    public cc?: string[] | null,
    public cco?: string[] | null,
    public asunto?: string | null,
    public mensaje?: string | null,
    public activada?: boolean | null,
    public enviada?: boolean | null,
    public fechaDeEnvio?: Date | null,
  ) {
    this.para = this.para ? this.para : [];
    this.cc = this.cc ? this.cc : [];
    this.cco = this.cco ? this.cco : [];
    this.mensaje = this.mensaje ? this.mensaje : 'Estimado [[${solicitud.solicitante.nombre}]]';
  }
}
