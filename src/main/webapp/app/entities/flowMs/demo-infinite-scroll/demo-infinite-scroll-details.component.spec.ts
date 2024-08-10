/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import DemoInfiniteScrollDetails from './demo-infinite-scroll-details.vue';
import DemoInfiniteScrollService from './demo-infinite-scroll.service';
import AlertService from '@/shared/alert/alert.service';

type DemoInfiniteScrollDetailsComponentType = InstanceType<typeof DemoInfiniteScrollDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const demoInfiniteScrollSample = { id: 'ABC' };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('DemoInfiniteScroll Management Detail Component', () => {
    let demoInfiniteScrollServiceStub: SinonStubbedInstance<DemoInfiniteScrollService>;
    let mountOptions: MountingOptions<DemoInfiniteScrollDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      demoInfiniteScrollServiceStub = sinon.createStubInstance<DemoInfiniteScrollService>(DemoInfiniteScrollService);

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
          demoInfiniteScrollService: () => demoInfiniteScrollServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        demoInfiniteScrollServiceStub.find.resolves(demoInfiniteScrollSample);
        route = {
          params: {
            demoInfiniteScrollId: '' + 'ABC',
          },
        };
        const wrapper = shallowMount(DemoInfiniteScrollDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.demoInfiniteScroll).toMatchObject(demoInfiniteScrollSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        demoInfiniteScrollServiceStub.find.resolves(demoInfiniteScrollSample);
        const wrapper = shallowMount(DemoInfiniteScrollDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
