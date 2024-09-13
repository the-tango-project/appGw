import { computed, defineComponent, ref, type Ref, inject } from 'vue';
import { Autoridad, type IAutoridad } from '@/shared/model/autoridad.model';
import UserManagementService from '@/admin/user-management/user-management.service';
import { useSelectOptions } from '@/shared/composables/use-select-options';
import AuthorityDetails from './components/authority-details.vue';
import useObjectUtils from '@/shared/util/object-utils';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'AccessControl',
  components: { 'authority-details': AuthorityDetails },
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const userManagementService = inject('userManagementService', () => new UserManagementService(), true);
    const fields = ['usuarioId', 'nombre', 'login', 'roles', 'acciones'];
    const busy = ref(false);
    const authorityOptions = useSelectOptions().authorityOptions;
    const objectUtils = useObjectUtils();

    const addOrUpdateAuthorityModal = ref<any>(null);
    const deleteAuthorityModal = ref<any>(null);
    const filter: Ref<string> = ref(null);

    const showSearcher: Ref<boolean> = ref(true);
    const addAuthority: Ref<boolean> = ref(false);

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
      filter,
      solution,
      fields,
      busy,
      autorityToEdit,
      addOrUpdateAuthorityModal,
      deleteAuthorityModal,
      isFetching,
      userNotFound,
      userManagementService,
      authorityOptions,
      isAuthorityCorrect,
      userAlreadyInList,
      loginToFind,
      showSearcher,
      objectUtils,
      addAuthority,
    };
  },
  methods: {
    isRemovable(autoridad: Autoridad): boolean {
      return true;
    },
    prepareAddHandler(): void {
      this.clear();
      this.initAddOrEdit(new Autoridad());
    },
    prepareToEditHandler(autoridad: Autoridad): void {
      this.showSearcher = false;
      this.addAuthority = false;
      this.initAddOrEdit(this.objectUtils.clone(autoridad));
    },
    initAddOrEdit(autoridad: Autoridad | null): void {
      this.userAlreadyInList = false;
      this.autorityToEdit = autoridad;
      this.addOrUpdateAuthorityModal.show();
    },
    prepareToDeleteHandler(autoridad: Autoridad): void {
      this.userAlreadyInList = false;
      this.autorityToEdit = autoridad;
      this.deleteAuthorityModal.show();
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
      if (this.addAuthority) {
        if (this.solution?.autoridades) {
          this.solution.autoridades.push(this.autorityToEdit);
        }
      } else if (this.solution) {
        const authorityIndex = this.findAuthorityIndexByLogin(this.autorityToEdit?.login);
        this.solution.autoridades[authorityIndex] = this.objectUtils.clone(this.autorityToEdit);
      }
    },
    deleteUserHandler(): void {
      if (this.solution) {
        const authorityIndex = this.findAuthorityIndexByLogin(this.autorityToEdit?.login);
        this.solution.autoridades.splice(authorityIndex, 1);
      }
    },
    findAuthorityIndexByLogin(login: string | null | undefined) {
      if (this.solution) {
        return this.solution.autoridades.findIndex((authority: IAutoridad) => authority.login === login);
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
      this.showSearcher = true;
      this.addAuthority = true;
    },
  },
});
