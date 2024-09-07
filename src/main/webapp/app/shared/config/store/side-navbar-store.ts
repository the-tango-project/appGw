import type { IStateEditable } from '@/shared/model/proceso/estado.model';
import { defineStore } from 'pinia';

export interface SideNavbarStateStorable {
  leftOpened: boolean;
  rightOpened: boolean;
  stateHolder: IStateEditable | null;
}

export const defaultSideNavbarState: SideNavbarStateStorable = {
  leftOpened: false,
  rightOpened: false,
  stateHolder: null,
};

export const useSideNavbarStore = defineStore('sideNavbarStore', {
  state: (): SideNavbarStateStorable => ({ ...defaultSideNavbarState }),
  getters: {
    isLeftOpened: state => state.leftOpened,
    isRightOpened: state => state.rightOpened,
    stateToEdit: state => state.stateHolder,
  },
  actions: {
    closeLeftSidebar() {
      this.leftOpened = false;
    },
    openLeftSidebar() {
      this.leftOpened = true;
    },
    toggleLeftSidebar() {
      this.leftOpened = !this.leftOpened;
    },
    closeRightSidebar() {
      this.rightOpened = false;
    },
    openRightSidebar() {
      this.rightOpened = true;
    },
    toggleRightSidebar() {
      this.rightOpened = !this.rightOpened;
    },
    setStateToEdit(newState: IStateEditable) {
      this.stateHolder = newState;
    },
  },
});
