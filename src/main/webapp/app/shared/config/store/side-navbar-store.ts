import { defineStore } from 'pinia';

export interface SideNavbarStateStorable {
  leftOpened: boolean;
  rightOpened: boolean;
}

export const defaultSideNavbarState: SideNavbarStateStorable = {
  leftOpened: false,
  rightOpened: false,
};

export const useSideNavbarStore = defineStore('sideNavbarStore', {
  state: (): SideNavbarStateStorable => ({ ...defaultSideNavbarState }),
  getters: {
    isLeftOpened: state => state.leftOpened,
    isRightOpened: state => state.rightOpened,
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
  },
});
