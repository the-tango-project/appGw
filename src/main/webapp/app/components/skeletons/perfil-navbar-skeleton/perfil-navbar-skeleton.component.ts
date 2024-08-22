import { useStore } from '@/store';

import { computed, defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PerfilNavbarSkeleton',
  props: {
    icono: {
      type: String,
      default: 'person',
    },
  },
  setup() {
    const store = useStore();
    const authenticated = computed(() => store.authenticated);
    const account = computed(() => store.userIdentity);

    return {
      authenticated,
      account,
    };
  },
});
