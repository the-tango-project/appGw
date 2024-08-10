/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import DemoInfiniteScrollUpdate from './demo-infinite-scroll-update.vue';
import DemoInfiniteScrollService from './demo-infinite-scroll.service';
import AlertService from '@/shared/alert/alert.service';

type DemoInfiniteScrollUpdateComponentType = InstanceType<typeof DemoInfiniteScrollUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const demoInfiniteScrollSample = { id: 'ABC' };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<DemoInfiniteScrollUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('DemoInfiniteScroll Management Update Component', () => {
    let comp: DemoInfiniteScrollUpdateComponentType;
    let demoInfiniteScrollServiceStub: SinonStubbedInstance<DemoInfiniteScrollService>;

    beforeEach(() => {
      route = {};
      demoInfiniteScrollServiceStub = sinon.createStubInstance<DemoInfiniteScrollService>(DemoInfiniteScrollService);
      demoInfiniteScrollServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          demoInfiniteScrollService: () => demoInfiniteScrollServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(DemoInfiniteScrollUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.demoInfiniteScroll = demoInfiniteScrollSample;
        demoInfiniteScrollServiceStub.update.resolves(demoInfiniteScrollSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(demoInfiniteScrollServiceStub.update.calledWith(demoInfiniteScrollSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        demoInfiniteScrollServiceStub.create.resolves(entity);
        const wrapper = shallowMount(DemoInfiniteScrollUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.demoInfiniteScroll = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(demoInfiniteScrollServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        demoInfiniteScrollServiceStub.find.resolves(demoInfiniteScrollSample);
        demoInfiniteScrollServiceStub.retrieve.resolves([demoInfiniteScrollSample]);

        // WHEN
        route = {
          params: {
            demoInfiniteScrollId: '' + demoInfiniteScrollSample.id,
          },
        };
        const wrapper = shallowMount(DemoInfiniteScrollUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.demoInfiniteScroll).toMatchObject(demoInfiniteScrollSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        demoInfiniteScrollServiceStub.find.resolves(demoInfiniteScrollSample);
        const wrapper = shallowMount(DemoInfiniteScrollUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
