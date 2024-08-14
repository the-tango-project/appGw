import { EstadoSolucion } from '@/shared/model/enumerations/estado-solucion.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { TipoSolucion } from '@/shared/model/enumerations/tipo-solucion.model';
import { TipoReglaFiltro } from '@/shared/model/enumerations/tipo-regla-filtro.model';
import { TipoAcceso } from '@/shared/model/enumerations/tipo-acceso.model';

export interface IFiltroPropiedad {
  path?: string | null;
  nombre?: string | null;
  propiedad?: string | null;
  valor?: string | null;
  tipoReglaFiltro?: TipoReglaFiltro | null;
  filtroValores?: [string] | null;
}

export class FiltroPropiedad implements IFiltroPropiedad {
  constructor(
    public path?: string | null,
    public nombre?: string | null,
    public propiedad?: string | null,
    public valor?: string | null,
    public tipoReglaFiltro?: TipoReglaFiltro | null,
    public filtroValores?: [string] | null,
  ) {}
}

export interface IFiltro {
  solicitudId?: string | null;
  solucionId?: string | null;
  cvuSolicitante?: string | null;
  estadoSolucion?: EstadoSolucion | null;
  estadosSolicitud?: EstadoSolicitud[] | null;
  tiposDeAcceso?: TipoAcceso[] | null;
  usuario?: string | null;
  checkbox?: boolean;
  idsSolicitud?: string[];
  solucionVisible?: boolean | null;
  tipoSolicitud?: string;
  idsSolucion?: [string];
  rol?: string;
  estadoSolicitud?: EstadoSolicitud;
  claveArea?: string;
  propiedades?: IFiltroPropiedad[];
  esReconsideracion?: boolean;
  idInstitucion?: string;
  idDependencia?: string;
  idSubDependencia?: string;
  idDepartamento?: string;
  claveInstitucion?: string;
  noEstadosSolicitud?: EstadoSolicitud[] | null;
}

export class Filtro implements IFiltro {
  constructor(
    public solicitudId?: string | null,
    public solucionId?: string | null,
    public cvuSolicitante?: string | null,
    public estadoSolucion?: EstadoSolucion | null,
    public estadosSolicitud?: EstadoSolicitud[] | null,
    public tiposDeAcceso?: TipoAcceso[] | null,
    public usuario?: string | null,
    public checkBoxSelected?: boolean | null,
    public idsSolicitud?: string[],
    public solucionVisible?: boolean,
    public tipoSolicitud?: string,
    public tipoSolucion?: TipoSolucion | null,
    public idsSolucion?: [string],
    public estadoSolicitud?: EstadoSolicitud,
    public claveArea?: string,
    public propiedades?: IFiltroPropiedad[],
    public tiposSolucion?: TipoSolucion[],
    public idInstitucion?: string,
    public idDependencia?: string,
    public idSubDependencia?: string,
    public idDepartamento?: string,
    public claveInstitucion?: string,
    public nombreInstitucionNacional?: string,
    public nombreProgramaNacional?: string,
    public claveProgramaNacional?: string,
    public nombreSolicitante?: string,
    public apellidoPaternoSolicitante?: string,
    public apellidoMaternoSolicitante?: string,
  ) {
    this.estadosSolicitud = this.estadosSolicitud ? this.estadosSolicitud : [];
    this.tiposDeAcceso = this.tiposDeAcceso ? this.tiposDeAcceso : [];
    this.propiedades = this.propiedades ? this.propiedades : [];
  }
}

export class FiltroBeca implements IFiltro {
  constructor(
    public solicitudId?: string | null,
    public solicitudRizomaId?: string | null,
    public idSolucion?: string | null,
    public curpBecario?: string | null,
    public cvuBecario?: string | null,
    public nombreBecario?: string | null,
    public apellidoPaternoBecario?: string | null,
    public apellidoMaternoBecario?: string | null,
    public claveInstitucionNacional?: string | null,
    public nombreInstitucionNacional?: string | null,
    public claveProgramaNacional?: string | null,
    public nombreProgramaNacional?: string | null,
    public claveSedeNacional?: string | null,
    public nombreSedeNacional?: string | null,
    public claveGradoNacional?: string | null,
    public nombreGradoNacional?: string | null,
    public tipoSolucion?: string | null,
    public tipoPrograma?: string | null,
    public orientacion?: string | null,
    public modalidad?: string | null,
    public bitacoraLiberacionBecasId?: string | null,
  ) {}
}
