import { type IDocumentoConfiguracion } from '@/shared/model/configuracion/documentos-configuracion.model';
import { Rule } from '@/shared/model/rule.model';
import { RolAutoridad } from '../enumerations/rol-autoridad.model';

export interface IConfiguracion {
  carpeta?: string | null;
  hasMoreDocuments?: boolean | null;
  maxNumberOfDocuments?: number | null;
  maxFileSize?: number | null;
  mediaTypes?: string[] | null;
  documentos?: IDocumentoConfiguracion[] | null;
  reglas?: Rule[] | null;
  roles?: RolAutoridad[] | null;
  expresion?: string | null;
}

export class Configuracion implements IConfiguracion {
  constructor(
    public carpeta?: string | null,
    public hasMoreDocuments?: boolean | null,
    public maxNumberOfDocuments?: number | null,
    public maxFileSize?: number | null,
    public mediaTypes?: string[] | null,
    public documentos?: IDocumentoConfiguracion[] | null,
    public reglas?: Rule[] | null,
    public roles?: RolAutoridad[] | null,
    public expresion?: string | null,
  ) {
    this.documentos = this.documentos ? this.documentos : [];
    this.reglas = this.reglas ? this.reglas : [];
    this.roles = this.roles ? this.roles : [];
  }
}
