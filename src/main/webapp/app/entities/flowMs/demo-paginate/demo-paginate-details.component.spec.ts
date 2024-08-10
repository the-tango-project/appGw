/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import DemoPaginateDetails from './demo-paginate-details.vue';
import DemoPaginateService from './demo-paginate.service';
import AlertService from '@/shared/alert/alert.service';

type DemoPaginateDetailsComponentType = InstanceType<typeof DemoPaginateDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const demoPaginateSample = { id: 'ABC' };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('DemoPaginate Management Detail Component', () => {
    let demoPaginateServiceStub: SinonStubbedInstance<DemoPaginateService>;
    let mountOptions: MountingOptions<DemoPaginateDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      demoPaginateServiceStub = sinon.createStubInstance<DemoPaginateService>(DemoPaginateService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          demoPaginateService: () => demoPaginateServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        demoPaginateServiceStub.find.resolves(demoPaginateSample);
        route = {
          params: {
            demoPaginateId: '' + 'ABC',
          },
        };
        const wrapper = shallowMount(DemoPaginateDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.demoPaginate).toMatchObject(demoPaginateSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        demoPaginateServiceStub.find.resolves(demoPaginateSample);
        const wrapper = shallowMount(DemoPaginateDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
