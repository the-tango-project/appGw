import type { RolAutoridad } from '@/shared/model/enumerations/rol-autoridad.model';
import type { IEstado } from '@/shared/model/proceso/estado.model';
import { Permiso, type IPermiso } from '@/shared/model/proceso/permiso.model';
import type { ISolucion } from '@/shared/model/solucion.model';
import { defineStore } from 'pinia';

export interface SolutionStateStorable {
  states: IEstado[];
  roles: RolAutoridad[];
}

export const defaultSolutionState: SolutionStateStorable = {
  states: [],
  roles: [],
};

export const useSolutionStore = defineStore('solutionStore', {
  state: (): SolutionStateStorable => ({ ...defaultSolutionState }),
  getters: {
    selectedStates: state => state.states,
    selectedRoles: state => state.roles,
    selectedPermisos: state => {
      const permisos: Array<IPermiso> = [];
      state.roles.forEach(role => {
        const permiso = new Permiso();
        permiso.rol = role;
        permisos.push(permiso);
      });
      return permisos;
    },
  },
  actions: {
    initContext(solution: ISolucion | null | undefined) {
      this.cleanContext();
      if (solution?.proceso?.estados && solution?.proceso?.estados.length > 0) {
        this.addAllStates(solution.proceso.estados);
        if (solution?.proceso?.roles?.length && solution.proceso.roles.length > 0) {
          this.addAllRoles(solution.proceso.roles);
        }
      }
    },
    hasRole(role: RolAutoridad) {},
    addState(state: IEstado | null | undefined) {
      if (state && this.states) {
        this.states.push(state);
      }
    },
    addAllStates(states: IEstado[] | null | undefined) {
      if (states) {
        states.forEach(state => {
          this.addState(state);
        });
      }
    },
    addRole(role: RolAutoridad | null | undefined) {
      if (role && this.roles) {
        this.roles.push(role);
      }
    },
    addAllRoles(roles: RolAutoridad[] | null | undefined) {
      if (roles) {
        roles.forEach(role => {
          this.addRole(role);
        });
      }
    },
    cleanContext() {
      this.states = [];
      this.roles = [];
    },
  },
});
