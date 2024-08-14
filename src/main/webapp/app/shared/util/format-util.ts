export function fullName(persona: any) {
  if (persona) {
    return `${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno ?? ''}`.trim();
  }
  return '';
}

/**
 * Función que sólo permite capturar números.
 * @param evt
 * @returns
 */
export function onlyNumbers(evt): boolean {
  const charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 47 && charCode < 58) {
    return true;
  } else {
    evt.preventDefault();
  }
}
