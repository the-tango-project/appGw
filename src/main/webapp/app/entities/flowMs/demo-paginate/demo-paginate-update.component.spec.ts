/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import DemoPaginateUpdate from './demo-paginate-update.vue';
import DemoPaginateService from './demo-paginate.service';
import { DATE_TIME_LONG_FORMAT } from '@/shared/composables/date-format';
import AlertService from '@/shared/alert/alert.service';

type DemoPaginateUpdateComponentType = InstanceType<typeof DemoPaginateUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const demoPaginateSample = { id: 'ABC' };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<DemoPaginateUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('DemoPaginate Management Update Component', () => {
    let comp: DemoPaginateUpdateComponentType;
    let demoPaginateServiceStub: SinonStubbedInstance<DemoPaginateService>;

    beforeEach(() => {
      route = {};
      demoPaginateServiceStub = sinon.createStubInstance<DemoPaginateService>(DemoPaginateService);
      demoPaginateServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          demoPaginateService: () => demoPaginateServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('load', () => {
      beforeEach(() => {
        const wrapper = shallowMount(DemoPaginateUpdate, { global: mountOptions });
        comp = wrapper.vm;
      });
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(DemoPaginateUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.demoPaginate = demoPaginateSample;
        demoPaginateServiceStub.update.resolves(demoPaginateSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(demoPaginateServiceStub.update.calledWith(demoPaginateSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        demoPaginateServiceStub.create.resolves(entity);
        const wrapper = shallowMount(DemoPaginateUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.demoPaginate = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(demoPaginateServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        demoPaginateServiceStub.find.resolves(demoPaginateSample);
        demoPaginateServiceStub.retrieve.resolves([demoPaginateSample]);

        // WHEN
        route = {
          params: {
            demoPaginateId: '' + demoPaginateSample.id,
          },
        };
        const wrapper = shallowMount(DemoPaginateUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.demoPaginate).toMatchObject(demoPaginateSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        demoPaginateServiceStub.find.resolves(demoPaginateSample);
        const wrapper = shallowMount(DemoPaginateUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
