import { EstadoWrapper, type IEstadoWrapper } from '@/entities/solucion/estado-wrapper';
import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import { Estado, StateEditable, type IEstado } from '@/shared/model/proceso/estado.model';
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
   * Find the index of a state. return -1 if the index is not in the process
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  findIndexOfState(proceso: IProceso | null | undefined, id: EstadoSolicitud): number {
    const indexFounded = proceso?.estados?.findIndex(estado => estado.nombre === id);

    if (indexFounded === null || indexFounded === undefined) {
      return -1;
    }

    return indexFounded;
  },

  /**
   * Create a state to edit from the process and estado solicitud id
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  createStateToEdit(proceso: IProceso | null | undefined, id: EstadoSolicitud): IEstadoWrapper {
    const stateToEdit = new EstadoWrapper();
    stateToEdit.state = this.findState(proceso, id);
    stateToEdit.currentIndex = this.findIndexOfState(proceso, id);
    stateToEdit.oldName = stateToEdit.state?.nombre;
    return stateToEdit;
  },

  /**
   * Create a state to edit from the process and estado solicitud id
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  renameStateName(proceso: IProceso | null | undefined, oldName: EstadoSolicitud, newName: EstadoSolicitud) {
    if (!proceso?.estados) {
      return;
    }

    proceso.estados.forEach(state => {
      if (state.transiciones) {
        state.transiciones.forEach(transition => {
          if (transition.destino === oldName) {
            transition.destino = newName;
          }
        });
      }
    });
  },
});

export default useSolucionUtils;
