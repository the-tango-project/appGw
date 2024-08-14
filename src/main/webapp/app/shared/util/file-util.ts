/**
 * Crea un elemento <a> a partir de un objeto Blob o MediaSource y lo descarga
 * @param obj el objeto que se va a descargar
 * @param fileName el nombre del archivo con su extensión
 */
export function downloadFile(obj: Blob | MediaSource, fileName: string) {
  const url = window.URL.createObjectURL(obj);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}
