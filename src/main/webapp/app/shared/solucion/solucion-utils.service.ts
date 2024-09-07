import type { EstadoSolicitud } from '../model/enumerations/estado-solicitud.model';
import { TipoAccion } from '../model/enumerations/tipo-accion.model';
import type { IEstado } from '../model/proceso/estado.model';

/**
 * SolucionUtils for common operation in the Solucion object
 */
const useSolucionUtils = () => ({
  /**
   * Method to abbreviate the text given
   */
  resolveActions(estados: IEstado[], currentState: string | undefined): TipoAccion[] {
    //Init actions with default actions: Read, Write and Commend
    const actions: TipoAccion[] = [TipoAccion.LEER, TipoAccion.ESCRIBIR, TipoAccion.COMENTAR];
    estados
      .filter(state => currentState == state.nombre)
      .forEach(state => {
        if (state.transiciones) {
          state.transiciones.forEach(transition => {
            if (transition.accion) {
              actions.push(transition.accion);
            }
          });
        }
      });
    return actions;
  },
});

export default useSolucionUtils;
