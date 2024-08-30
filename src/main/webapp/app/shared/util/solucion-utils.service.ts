import type { EstadoSolicitud } from '../model/enumerations/estado-solicitud.model';
import type { IEstado } from '../model/proceso/estado.model';
import type { IProceso } from '../model/proceso/proceso.model';

/**
 * An composable utility for Solution.
 */
const useSolucionUtils = () => ({
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
});

export default useSolucionUtils;
