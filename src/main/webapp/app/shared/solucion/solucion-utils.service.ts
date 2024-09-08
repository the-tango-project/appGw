import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { StateEditable, type IEstado } from '@/shared/model/proceso/estado.model';
import type { IProceso } from '@/shared/model/proceso/proceso.model';

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

  /**
   * Find a state into a process
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  findState(proceso: IProceso | null | undefined, id: EstadoSolicitud): IEstado | null {
    let findedNode = proceso?.estados?.find(estado => estado.nombre === id);
    if (findedNode) {
      return JSON.parse(JSON.stringify(findedNode));
    } else {
      return null;
    }
  },

  /**
   * Create a state to edit from the process and estado solicitud id
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  createStateToEdit(proceso: IProceso | null | undefined, id: EstadoSolicitud) {
    const stateToEdit = new StateEditable();
    stateToEdit.state = this.findState(proceso, id);

    if (stateToEdit.state) {
      stateToEdit.id = stateToEdit.state.nombre;
    }
    return stateToEdit;
  },
});

export default useSolucionUtils;
