import { defineStore } from 'pinia';

export interface SideNavbarStateStorable {
  opened: boolean;
}

export const defaultSideNavbarState: SideNavbarStateStorable = {
  opened: false,
};

export const useSideNavbarStore = defineStore('sideNavbarStore', {
  state: (): SideNavbarStateStorable => ({ ...defaultSideNavbarState }),
  getters: {
    isOpened: state => state.opened,
  },
  actions: {
    closeSidebar() {
      this.opened = false;
    },
    openSidebar() {
      this.opened = true;
    },
    toggleSidebar() {
      this.opened = !this.opened;
    },
  },
});
