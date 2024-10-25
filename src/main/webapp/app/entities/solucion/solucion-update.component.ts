import { computed, defineComponent, inject, ref, type Ref, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { useAlertService } from '@/shared/alert/alert.service';
import useDataUtils from '@/shared/data/data-utils.service';

import { useValidation, useDateFormat } from '@/shared/composables';

//Entity services
import SolucionService from '@/entities/solucion/solucion.service';
import ScriptService from '@/shared/script/script.service';

//Entity model
import { Solucion, type ISolucion } from '@/shared/model/solucion.model';

import { useSelectOptions } from '@/shared/composables/use-select-options';

import { Diagram, NodeChange, type EdgeChange } from '@/shared/model/proceso/diagram.model';
import { NodeChangeType } from '@/shared/model/enumerations/node-change-type.model';
import { EdgeChangeType } from '@/shared/model/enumerations/edge-change-type.model';

import { useSideNavbarStore, useSolutionStore } from '@/store';
import { Estado, type IEstado } from '@/shared/model/proceso/estado.model';
import useObjectUtils from '@/shared/util/object-utils';
import { EstadoSolucion } from '@/shared/model/enumerations/estado-solucion.model';
import VersionComponent from '@/components/process/version/version.vue';
import GeneralData from './components/general-data/general-data.vue';
import Messages from './components/messages/messages.vue';
import AccessControl from './components/access-control/access-control.vue';
import ChangeControl from './components/change-control/change-control.vue';
import Configuration from './components/configuration/configuration.vue';
import Dashboard from './components/dashboard/dashboard.vue';
import EmailTemplate from './components/email-template/email-template.vue';
import Forms from './components/forms/forms.vue';
import EditTransition from './components/edit-transition/edit-transition.vue';
import { ITransitionWrapper, Transicion, TransitionWrapper, type ITransicion } from '@/shared/model/proceso/transicion.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { isGreaterOrEqualToZero } from '@/shared/util/validation-utils';
import { type IEstadoWrapper } from './estado-wrapper';

import SolutionUtilService from '@/entities/solucion/solucion-utils.service';
import SelectAction from './components/select-action/select-action.vue';
import SelectState from './components/select-state/select-state.vue';
import { TipoAccion } from '@/shared/model/enumerations/tipo-accion.model';

const useValidationRules = (validations: any, t$: any) => {
  return {
    title: { required: validations.required(t$('entity.validation.required').toString()) },
    menuName: {},
    description: {},
    name: {},
    path: {},
    type: {},
    icon: {},
    display: {},
    tags: {},
    owner: {},
    machineName: {},
    tipo: {},
  };
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'SolucionUpdate',
  components: {
    configuration: Configuration,
    dashboard: Dashboard,
    forms: Forms,
    messages: Messages,
    version: VersionComponent,
    'access-control': AccessControl,
    'change-control': ChangeControl,
    'email-template': EmailTemplate,
    'general-data': GeneralData,
    'edit-transition': EditTransition,
    'select-action': SelectAction,
    'select-state': SelectState,
  },
  setup() {
    //Commons methods
    const { t: t$ } = useI18n();
    const coreFlow = ref<any>(null);
    const selectOptions = useSelectOptions();
    const validations = useValidation();
    const validationRules = useValidationRules(validations, t$);
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const route = useRoute();
    const router = useRouter();
    const objectUtils = useObjectUtils();

    //Store configuration
    const sideNavbarStore = useSideNavbarStore();
    const solutionStore = useSolutionStore();

    //Common services
    const alertService = inject('alertService', () => useAlertService(), true);
    const solucionService = inject('solucionService', () => new SolucionService());
    const scriptService = inject('scriptService', () => new ScriptService());
    const solutionUtilService = inject('solutionUtilService', () => new SolutionUtilService(solutionStore));

    //Common properties
    const solucion: Ref<ISolucion> = ref(new Solucion());
    const currentPublishedSolution: Ref<ISolucion> = ref(new Solucion());

    const isSaving: Ref<boolean> = ref(false);
    const isFetching: Ref<boolean> = ref(false);

    const isImporting: Ref<boolean> = ref(false);
    const tabIndex: Ref<number> = ref(0);
    const stateWrapperToEdit: Ref<IEstadoWrapper | null> = ref(null);

    // Transition to edit
    const transitionWrapperToEdit: Ref<ITransitionWrapper> = ref(new TransitionWrapper());
    const nodeChangeToEdit: Ref<NodeChange> = ref(new NodeChange());

    //SelectOne options
    const tipoMenuOptions = ref(selectOptions.menuOptions);
    const tipoComponentOptions = ref(selectOptions.componenteOptions);

    //Modals
    const editTransitionModal = ref<any>(null);
    const editStateModal = ref<any>(null);
    const completeActionAndStateModal = ref<any>(null);

    // Method definition
    const retriveById = async (solucionId: any) => {
      isFetching.value = true;
      try {
        const res: ISolucion = await solucionService().findByLastEdited(solucionId);
        solucion.value = res;
        isFetching.value = false;
        resolveRolesFromStates();
        solutionStore.saveProceso(objectUtils.clone(solucion.value.proceso));
        //Dirty fix to fit the flow view after loading
        //setTimeout(() => coreFlow.value.fitViewHandler(), 100);
      } catch (error: any) {
        alertService.showHttpError(error.response);
      }
    };

    //TODO: This most be removed after migrate all states of legacy solutions
    const resolveRolesFromStates = () => {
      if (
        solucion.value?.proceso?.estados &&
        solucion.value.proceso.estados.length > 0 &&
        solucion.value.proceso?.roles &&
        solucion.value.proceso.roles.length <= 0
      ) {
        solucion.value.proceso.estados.forEach(estado => {
          if (estado.permisos) {
            estado.permisos.forEach(permiso => {
              if (solucion?.value?.proceso?.roles && permiso.rol) {
                const rolFounded = solucion.value.proceso.roles.find(rol => rol === permiso.rol);
                if (!rolFounded) {
                  solucion.value.proceso.roles.push(permiso.rol);
                }
              }
            });
            if (solucion.value.proceso?.roles) {
              solutionStore.addAllRoles(solucion.value.proceso.roles);
            }
          }
        });
      }
    };

    const retriveLastPublishedById = async (solucionId: any) => {
      try {
        const res: ISolucion = await solucionService().find(solucionId);
        currentPublishedSolution.value = res;
      } catch (error: any) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.solucionId) {
      retriveById(route.params.solucionId);
      retriveLastPublishedById(route.params.solucionId);
    }

    //Validation configuration
    const v$ = useVuelidate(validationRules, solucion as any);
    v$.value.$validate();

    onUnmounted(() => {
      sideNavbarStore.closeLeftSidebar();
      sideNavbarStore.closeRightSidebar();
    });

    const isNavbarOpen = computed(() => sideNavbarStore.isLeftOpened || sideNavbarStore.isRightOpened);
    const isArchivada = computed(() => solucion.value.estado === EstadoSolucion.ARCHIVADA);

    return {
      nodeChangeToEdit,
      tipoMenuOptions,
      tipoComponentOptions,
      ...dateFormat,
      ...dataUtils,
      solucion,
      currentPublishedSolution,
      isSaving,
      tabIndex,
      isImporting,
      isFetching,
      t$,
      v$,
      router,
      sideNavbarStore,
      transitionWrapperToEdit,
      stateWrapperToEdit,
      solutionStore,
      objectUtils,
      isArchivada,
      isNavbarOpen,
      coreFlow,
      editTransitionModal,
      editStateModal,
      completeActionAndStateModal,
      alertService,
      solucionService,
      scriptService,
      solutionUtilService,
    };
  },
  methods: {
    handleClone(): void {},
    handleExport(): void {},
    handleOpenImportModal(): void {},
    handleActivatedTab(): void {},
    linkClass(index: number): string[] {
      if (this.tabIndex === index) {
        return ['bg-light', 'text-primary'];
      } else {
        return ['bg-light'];
      }
    },
    resolveIcon(icon: string, index: number): string {
      if (icon === 'table') return icon;
      return icon + (this.isTabActive(index) ? '-fill' : '');
    },
    isTabActive(index: number): boolean {
      if (this.tabIndex === index) {
        return true;
      } else {
        return false;
      }
    },
    previousState(): void {
      this.router.go(-1);
    },
    createForm(): void {},
    save(): void {
      this.isSaving = true;
      if (this.solucion.id) {
        this.solucionService()
          .update(this.solucion)
          .then((param: any) => {
            this.isSaving = false;
            this.alertService.showInfo(this.t$('flowMsApp.flowMsDemoPaginate.updated', { param: param.id }));
          })
          .catch((error: any) => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.solucionService()
          .create(this.solucion)
          .then((param: any) => {
            this.isSaving = false;
            this.alertService.showSuccess(this.t$('flowMsApp.flowMsDemoPaginate.created', { param: param.id }).toString());
          })
          .catch((error: any) => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    updateNodeHandler(change: NodeChange) {
      console.log('node type: ' + change.type);
      if (change.type === NodeChangeType.POSITION) {
        this.positionChangeHandler(change);
      } else if (change.type === NodeChangeType.ADD) {
        this.addNodeHandler(change);
      } else if (change.type === NodeChangeType.DELETE) {
        this.deleteNodeHandler(change);
      } else if (change.type === NodeChangeType.DOUBLE_CLICK) {
        this.doubleClickNodeHandler(change);
      }
    },

    updateEdgeHandler(change: EdgeChange) {
      if (change.type === EdgeChangeType.ADD) {
        this.addEdgeHandler(change);
      } else if (change.type === EdgeChangeType.DELETE) {
        this.deleteEdgeHandler(change);
      } else if (change.type === EdgeChangeType.DOUBLE_CLICK) {
        this.doubleClickEdgeHandler(change);
      }
    },

    positionChangeHandler(change: any) {
      console.log('positionChangeHandler');
      this.solucion.proceso?.estados?.forEach(estado => {
        if (estado.nombre === change.id && estado.diagram) {
          estado.diagram.x = change.x;
          estado.diagram.y = change.y;
        }
      });
    },

    addNodeHandler(change: NodeChange) {
      this.nodeChangeToEdit = change;
      this.completeActionAndStateModal.show();
    },

    confirmAddNodeHandler() {
      if (!this.solucion.proceso?.estados) {
        return;
      }

      const state = new Estado();
      state.permisos = JSON.parse(JSON.stringify(this.solutionStore.selectedPermisos));
      state.nombre = this.nodeChangeToEdit.id as EstadoSolicitud;
      state.diagram = new Diagram();
      state.diagram.type = this.nodeChangeToEdit.type;
      state.diagram.x = (this.nodeChangeToEdit.x ?? 0) - 25; //fix x calculation
      state.diagram.y = (this.nodeChangeToEdit.y ?? 0) - 186; // fix y calculation
      this.solucion.proceso.estados.push(state);

      if (this.nodeChangeToEdit.edgeChange) {
        this.nodeChangeToEdit.edgeChange.targetId = this.nodeChangeToEdit.id as EstadoSolicitud;
        this.addEdgeHandler(this.nodeChangeToEdit.edgeChange);
      }
      this.completeActionAndStateModal.hide();
    },

    addEdgeHandler(change: EdgeChange) {
      console.log('**addEdgeHandler**');
      //create edge into the process
      let currentState = null;
      if (this.solucion.proceso?.estados) {
        const stateIndex = this.solucion.proceso.estados.findIndex(state => state.nombre === change.sourceId);
        currentState = this.solucion.proceso.estados[stateIndex];
      }

      if (change.targetId && currentState?.transiciones) {
        const transition = new Transicion();
        transition.destino = change.targetId as EstadoSolicitud;
        transition.accion = change.action;
        transition.diagram = new Diagram();
        transition.diagram.sourceId = change.sourceHandle;
        transition.diagram.targetId = change.targetHandle;
        transition.diagram.type = change.lineType;
        currentState.transiciones.push(transition);
      }
      //call doubleClickEdgeHandler to edit
    },

    deleteNodeHandler(change: NodeChange) {
      // delete node and all the references to it
      const nodeId = change.id as EstadoSolicitud;
      this.removeStateFromProcess(nodeId);
      console.log('deleteNodeHandler');
    },

    deleteEdgeHandler(change: any) {
      console.log('deleteEdgeHandler');
    },

    clickNodeHandler(change: any) {
      console.log('clickNodeHandler');
    },

    doubleClickNodeHandler(change: any) {
      this.stateWrapperToEdit = this.solutionUtilService().createStateToEdit(this.solucion.proceso, change.id);
      this.editStateModal.show();
    },

    clickEdgeHandler(change: any) {
      console.log('clickEdgeHandler');
    },

    doubleClickEdgeHandler(change: EdgeChange) {
      console.log(change);
      if (this.solucion.proceso?.estados) {
        this.transitionWrapperToEdit = this.findTransition(change.sourceId, change.action);
        this.editTransitionModal.show();
      }
    },

    updateStateHandler() {
      if (
        !this.stateWrapperToEdit?.oldName ||
        !this.stateWrapperToEdit?.state?.nombre ||
        !this.stateWrapperToEdit ||
        !this.solucion?.proceso?.estados
      ) {
        return;
      }

      const oldStateName = this.stateWrapperToEdit.oldName;
      const newStateName = this.stateWrapperToEdit.state.nombre;

      if (oldStateName !== newStateName) {
        this.solutionUtilService().renameStateNameInTransitions(this.solucion.proceso, oldStateName, newStateName);
      }
      this.solutionUtilService().replaceStateBy(this.solucion.proceso, this.stateWrapperToEdit);
    },

    updateTransitionHandler() {
      let state: IEstado | null = null;

      if (this.solucion.proceso?.estados && this.transitionWrapperToEdit.fromIndex) {
        state = this.solucion.proceso?.estados[this.transitionWrapperToEdit.fromIndex];
      }

      if (state?.transiciones && this.transitionWrapperToEdit.transitionIndex && this.transitionWrapperToEdit.transition) {
        state.transiciones.splice(this.transitionWrapperToEdit.transitionIndex, 1, this.transitionWrapperToEdit.transition);
      }
    },

    findState(stateToFind: EstadoSolicitud): IEstado | undefined {
      let stateIndex: number | undefined = -1;
      if (stateToFind && this.solucion.proceso?.estados) {
        stateIndex = this.solucion.proceso.estados.findIndex(state => state.nombre === stateToFind);
        return this.solucion.proceso.estados[stateIndex];
      }
    },

    findTransition(from: string | null | undefined, action: string | null | undefined): ITransitionWrapper {
      let stateIndex: number | undefined = -1;
      let transitionIndex: number | undefined = -1;
      let currentState: IEstado | null = null;
      let currentTransition: ITransicion | null = null;
      if (from && this.solucion.proceso?.estados) {
        stateIndex = this.solucion.proceso.estados.findIndex(state => state.nombre === from);
        currentState = this.solucion.proceso.estados[stateIndex];
      }

      if (currentState?.transiciones && action) {
        transitionIndex = currentState.transiciones.findIndex(transition => transition.accion === action);
        currentTransition = currentState.transiciones[transitionIndex];
      }
      const transition = new TransitionWrapper();
      transition.fromIndex = stateIndex;
      transition.transitionIndex = transitionIndex;
      transition.transition = { ...currentTransition }; //we pass a copy not the main reference

      return transition;
    },

    fitViewHandler() {
      this.coreFlow.fitViewHandler();
    },

    removeStateFromProcess(stateToDelete: EstadoSolicitud) {
      if (stateToDelete && this.solucion.proceso?.estados) {
        const stateIndex = this.solucion.proceso.estados.findIndex(state => state.nombre === stateToDelete);
        if (stateIndex >= 0) {
          this.solucion.proceso.estados.splice(stateIndex, 1);
          this.removeTransitionsReferencesByState(stateToDelete);
        }
      }
    },

    removeTransitionsReferencesByState(destino: EstadoSolicitud) {
      if (!this.solucion.proceso?.estados) {
        return;
      }

      this.solucion.proceso.estados.forEach(state => {
        if (state.transiciones) {
          state.transiciones = state.transiciones.filter(transition => transition.destino != destino);
        }
      });
    },

    deleteTransitionHandle(transitionWrapper: ITransitionWrapper) {
      let state: IEstado | null = null;

      if (this.solucion.proceso?.estados && transitionWrapper.fromIndex) {
        state = this.solucion.proceso?.estados[transitionWrapper.fromIndex];
      }

      if (state?.transiciones && isGreaterOrEqualToZero(transitionWrapper.transitionIndex)) {
        state.transiciones.splice(transitionWrapper.transitionIndex!, 1);
      }

      this.editTransitionModal.hide();
    },

    isValidActionAndState(): boolean {
      if (this.nodeChangeToEdit?.edgeChange?.action && this.nodeChangeToEdit?.id) {
        return this.nodeChangeToEdit.edgeChange.action !== TipoAccion.NONE && this.nodeChangeToEdit.id !== EstadoSolicitud.NONE;
      }
      return false;
    },
  },
});
