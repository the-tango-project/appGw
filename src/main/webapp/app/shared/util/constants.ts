/**
 * Clase con las principales constantes que se utilizan en el proyecto
 */
export class Constants {
  static MEDIA_TYPE_OPTIONS = ['pdf', 'png', 'svg'];

  static FILE_SIZE_OPTIONS = [
    { value: 3000000, text: '3 MB' },
    { value: 5000000, text: '5 MB' },
    { value: 10000000, text: '10 MB' },
    { value: 15000000, text: '15 MB' },
  ];

  static REVISION_OPTIONS = [
    { text: 'Aceptar', value: true },
    { text: 'Rechazar', value: false },
  ];

  static VAR_CONTEXT_NAME = 'context';
}
