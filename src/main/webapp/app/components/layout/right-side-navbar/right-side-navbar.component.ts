import { computed, defineComponent, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSideNavbarStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'RightSideNavbar',
  setup() {
    const { t: t$ } = useI18n();
    const sideNavbarStore = useSideNavbarStore();
    const stateOptions: Ref<any> = ref(null);
    const stateToEdit = computed(() => sideNavbarStore.stateToEdit);

    return { stateToEdit, stateOptions, sideNavbarStore, t$ };
  },
  methods: {
    save(): void {
      if (this.stateToEdit) {
        this.stateToEdit.saved = true;
      }
    },
    cancel(): void {
      this.sideNavbarStore.closeRightSidebar();
    },
    updateStateHandler(): void {
      console.log('udpateStateHandler');
    },
  },
});
