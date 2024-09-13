import { computed, defineComponent, ref, type Ref, inject } from 'vue';
import { Autoridad, type IAutoridad } from '@/shared/model/autoridad.model';
import UserManagementService from '@/admin/user-management/user-management.service';
import { useSelectOptions } from '@/shared/composables/use-select-options';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'AccessControl',
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const userManagementService = inject('userManagementService', () => new UserManagementService(), true);
    const fields = ['cvu', 'usuarioId', 'nombre', 'roles', 'acciones'];
    const busy = ref(false);
    const authorityOptions = useSelectOptions().authorityOptions;

    const addAuthorityModal = ref<any>(null);
    const loginToFind: Ref<string | null> = ref(null);
    const autorityToEdit: Ref<Autoridad | null> = ref(new Autoridad());
    const isFetching: Ref<boolean> = ref(false);
    const userNotFound: Ref<boolean> = ref(false);
    const userAlreadyInList: Ref<boolean> = ref(false);
    const isAuthorityCorrect = computed(
      () => isFetching.value === false && userNotFound.value === false && userAlreadyInList.value === false,
    );

    const solution = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return {
      solution,
      fields,
      busy,
      autorityToEdit,
      addAuthorityModal,
      isFetching,
      userNotFound,
      userManagementService,
      authorityOptions,
      isAuthorityCorrect,
      userAlreadyInList,
      loginToFind,
    };
  },
  methods: {
    isRemovable(autoridad: Autoridad): boolean {
      return true;
    },
    prepareToRemoveHandler(autoridad: Autoridad): void {
      this.userAlreadyInList = false;
      this.autorityToEdit = autoridad;
      this.addAuthorityModal.show();
    },
    openAddAutoridadModalHandler(): void {
      this.clear();
      this.loginToFind = null;
      this.addAuthorityModal.show();
    },
    findAuthorityHandler(): void {
      this.clear();
      this.isFetching = true;
      this.userNotFound = false;
      if (this.loginToFind) {
        this.userManagementService
          .get(this.loginToFind)
          .then(res => {
            const user = res.data;
            if (this.autorityToEdit) {
              this.autorityToEdit.login = user.login;
              this.autorityToEdit.usuarioId = user.id;
              this.autorityToEdit.nombre = user.firstName;
              this.autorityToEdit.apellidoPaterno = user.lastName;
              this.userAlreadyInList = this.isUserInAuthorities(user.login);
              this.loginToFind = null;
            }
          })
          .catch(error => {
            if (error.response.status === 404) {
              this.userNotFound = true;
            }
          })
          .finally(() => {
            this.isFetching = false;
          });
      }
    },
    addUserHandler(): void {
      if (this.solution?.autoridades) {
        this.solution.autoridades.push(this.autorityToEdit);
      }
    },
    isUserInAuthorities(login: string): boolean {
      if (this.solution?.autoridades) {
        for (const authority of this.solution.autoridades) {
          if (authority.login === login) {
            return true;
          }
        }
      }
      return false;
    },
    clear(): void {
      this.autorityToEdit = new Autoridad();
      this.userAlreadyInList = false;
      this.userNotFound = false;
      this.userAlreadyInList = false;
      this.isFetching = false;
    },
  },
});
