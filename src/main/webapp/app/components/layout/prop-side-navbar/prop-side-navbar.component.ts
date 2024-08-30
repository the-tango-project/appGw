import { computed, defineComponent, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { type IOption } from '@/shared/model/ui/option.model';

import { useSelectOptions } from '@/shared/composables/use-select-options';

import { useSideNavbarStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PropSideNavbar',
  setup() {
    const { t: t$ } = useI18n();

    const sideNavbarStore = useSideNavbarStore();
    const stateOptions: Ref<any> = ref(null);

    const stateToEdit = computed(() => sideNavbarStore.stateToEdit);

    return { stateToEdit, stateOptions, t$ };
  },
  methods: {
    save(): void {},
    stateOptionsMethod(): IOption[] {
      return useSelectOptions().stateOptions;
    },
  },
});
