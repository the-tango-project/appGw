import type { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';
import type { IEstado } from '@/shared/model/proceso/estado.model';
import type { IProceso } from '@/shared/model/proceso/proceso.model';
import { type SolutionStore } from '@/store';
import { EstadoWrapper, type IEstadoWrapper } from './estado-wrapper';
import type { ITransitionWrapper } from '@/shared/model/proceso/transicion.model';
import useObjectUtils from '@/shared/util/object-utils';

export default class SolutionUtilService {
  constructor(private readonly store: SolutionStore) {}

  /**
   * Method to abbreviate the text given
   */
  public resolveActions(estados: IEstado[], currentState: string | undefined): TipoAccion[] {
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
  }

  /**
   * Find a state into a process
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  public findState(proceso: IProceso | null | undefined, id: EstadoSolicitud): IEstado | null {
    let findedNode = proceso?.estados?.find(estado => estado.nombre === id);
    if (findedNode) {
      return JSON.parse(JSON.stringify(findedNode));
    } else {
      return null;
    }
  }

  /**
   * Find the index of a state. return -1 if the index is not in the process
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  public findIndexOfState(proceso: IProceso | null | undefined, id: EstadoSolicitud): number {
    const indexFounded = proceso?.estados?.findIndex(estado => estado.nombre === id);

    if (indexFounded === null || indexFounded === undefined) {
      return -1;
    }

    return indexFounded;
  }

  /**
   * Create a state to edit from the process and estado solicitud id
   *
   * @param process the process of a solution
   * @param id the id of the state
   */
  public createStateToEdit(proceso: IProceso | null | undefined, id: EstadoSolicitud): IEstadoWrapper {
    const stateToEdit = new EstadoWrapper();
    stateToEdit.state = this.findState(proceso, id);
    stateToEdit.currentIndex = this.findIndexOfState(proceso, id);
    stateToEdit.oldName = stateToEdit.state?.nombre;
    return stateToEdit;
  }

  /**
   * Rename a state name in all transitions
   *
   * @param process the process of a solution
   * @param oldName the state name to replace
   * @param newName the new state name to replace
   */
  public renameStateNameInTransitions(proceso: IProceso | null | undefined, oldName: EstadoSolicitud, newName: EstadoSolicitud) {
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
  }

  public replaceStateBy(proceso: IProceso | null | undefined, stateWrapper: IEstadoWrapper) {
    if (proceso?.estados && stateWrapper.state) {
      proceso.estados.splice(stateWrapper.currentIndex!, 1, stateWrapper.state);
      this.store.saveProceso(proceso);
    }
  }

  public updateTransition(proceso: IProceso | null | undefined, transitionWrapperToEdit: ITransitionWrapper): void {
    let state: IEstado | null = null;
    if (proceso?.estados && transitionWrapperToEdit.fromIndex) {
      state = proceso?.estados[transitionWrapperToEdit.fromIndex];
    }
    if (state?.transiciones && transitionWrapperToEdit.transitionIndex && transitionWrapperToEdit.transition) {
      state.transiciones.splice(transitionWrapperToEdit.transitionIndex, 1, transitionWrapperToEdit.transition);
    }
    this.store.saveProceso(useObjectUtils().clone(proceso));
  }
}
