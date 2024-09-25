import { faker } from '@faker-js/faker';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import type { IForm } from '@/shared/model/form.model';

export class SolicitudFaker {
  static defaultSolicitud() {
    return this.getCommondData({ solicitante: this.defaultPersona({}) }, { id: faker.database.mongodbObjectId() });
  }

  static getCommondData(solicitud: any, solucion: any) {
    solicitud.id = faker.database.mongodbObjectId();
    solicitud.nombre = solicitud.solicitante.nombre;
    solicitud.usuario = solicitud.solicitante.login;
    solicitud.solucionId = solucion.id;
    solicitud.estado = EstadoSolicitud.EN_CAPTURA;
    return solicitud;
  }

  static defaultPersona(persona: any) {
    persona.login = faker.internet.userName();
    persona.nombre = faker.name.firstName();
    persona.apellidoPaterno = faker.name.lastName();
    persona.apellidoMaterno = faker.name.lastName();
    persona.genero = faker.name.gender();
    return persona;
  }

  static isFormInComponents(form: IForm, componentes: any[]) {
    return form.tipo === 'FORM' && componentes.findIndex(componente => componente.formId === form.id) >= 0;
  }

  static commonVariables() {
    return [
      { nombre: 'Nombre del solicitante', path: 'solicitud.solicitante.nombre' },
      { nombre: 'Apellido paterno del solicitante', path: 'solicitud.solicitante.apellidoPaterno' },
      { nombre: 'Apellido materno del solicitante', path: 'solicitud.solicitante.apellidoMaterno' },
      { nombre: 'Correo del solicitante', path: 'solicitud.solicitante.correo' },
      { nombre: 'CVU del solicitante', path: 'solicitud.solicitante.cvu' },
      { nombre: 'RFC del solicitante', path: 'solicitud.solicitante.rfc' },
      { nombre: 'CURP del solicitante', path: 'solicitud.solicitante.curp' },
      { nombre: 'Título del solicitante', path: 'solicitud.solicitante.titulo' },
    ];
  }

  static correos() {
    return [{ nombre: 'Solicitante', path: 'solicitud.solicitante.correo' }];
  }
}
