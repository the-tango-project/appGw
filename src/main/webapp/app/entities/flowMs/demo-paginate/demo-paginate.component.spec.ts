/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import DemoPaginate from './demo-paginate.vue';
import DemoPaginateService from './demo-paginate.service';
import AlertService from '@/shared/alert/alert.service';

type DemoPaginateComponentType = InstanceType<typeof DemoPaginate>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('DemoPaginate Management Component', () => {
    let demoPaginateServiceStub: SinonStubbedInstance<DemoPaginateService>;
    let mountOptions: MountingOptions<DemoPaginateComponentType>['global'];

    beforeEach(() => {
      demoPaginateServiceStub = sinon.createStubInstance<DemoPaginateService>(DemoPaginateService);
      demoPaginateServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          jhiItemCount: true,
          bPagination: true,
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'jhi-sort-indicator': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          demoPaginateService: () => demoPaginateServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        demoPaginateServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

        // WHEN
        const wrapper = shallowMount(DemoPaginate, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(demoPaginateServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.demoPaginates[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
      });

      it('should calculate the sort attribute for an id', async () => {
        // WHEN
        const wrapper = shallowMount(DemoPaginate, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(demoPaginateServiceStub.retrieve.lastCall.firstArg).toMatchObject({
          sort: ['id,asc'],
        });
      });
    });
    describe('Handles', () => {
      let comp: DemoPaginateComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(DemoPaginate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        demoPaginateServiceStub.retrieve.reset();
        demoPaginateServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('should load a page', async () => {
        // GIVEN
        demoPaginateServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

        // WHEN
        comp.page = 2;
        await comp.$nextTick();

        // THEN
        expect(demoPaginateServiceStub.retrieve.called).toBeTruthy();
        expect(comp.demoPaginates[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
      });

      it('should re-initialize the page', async () => {
        // GIVEN
        comp.page = 2;
        await comp.$nextTick();
        demoPaginateServiceStub.retrieve.reset();
        demoPaginateServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

        // WHEN
        comp.clear();
        await comp.$nextTick();

        // THEN
        expect(comp.page).toEqual(1);
        expect(demoPaginateServiceStub.retrieve.callCount).toEqual(1);
        expect(comp.demoPaginates[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
      });

      it('should calculate the sort attribute for a non-id attribute', async () => {
        // WHEN
        comp.propOrder = 'name';
        await comp.$nextTick();

        // THEN
        expect(demoPaginateServiceStub.retrieve.lastCall.firstArg).toMatchObject({
          sort: ['name,asc', 'id'],
        });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        demoPaginateServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 'ABC' });

        comp.removeDemoPaginate();
        await comp.$nextTick(); // clear components

        // THEN
        expect(demoPaginateServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(demoPaginateServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
