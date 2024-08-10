/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import DemoInfiniteScroll from './demo-infinite-scroll.vue';
import DemoInfiniteScrollService from './demo-infinite-scroll.service';
import AlertService from '@/shared/alert/alert.service';

type DemoInfiniteScrollComponentType = InstanceType<typeof DemoInfiniteScroll>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('DemoInfiniteScroll Management Component', () => {
    let demoInfiniteScrollServiceStub: SinonStubbedInstance<DemoInfiniteScrollService>;
    let mountOptions: MountingOptions<DemoInfiniteScrollComponentType>['global'];

    beforeEach(() => {
      demoInfiniteScrollServiceStub = sinon.createStubInstance<DemoInfiniteScrollService>(DemoInfiniteScrollService);
      demoInfiniteScrollServiceStub.retrieve.resolves({ headers: {} });

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
          demoInfiniteScrollService: () => demoInfiniteScrollServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        demoInfiniteScrollServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

        // WHEN
        const wrapper = shallowMount(DemoInfiniteScroll, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(demoInfiniteScrollServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.demoInfiniteScrolls[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
      });

      it('should calculate the sort attribute for an id', async () => {
        // WHEN
        const wrapper = shallowMount(DemoInfiniteScroll, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(demoInfiniteScrollServiceStub.retrieve.lastCall.firstArg).toMatchObject({
          sort: ['id,asc'],
        });
      });
    });
    describe('Handles', () => {
      let comp: DemoInfiniteScrollComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(DemoInfiniteScroll, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        demoInfiniteScrollServiceStub.retrieve.reset();
        demoInfiniteScrollServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('should load a page', async () => {
        // GIVEN
        demoInfiniteScrollServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

        // WHEN
        comp.page = 2;
        await comp.$nextTick();

        // THEN
        expect(demoInfiniteScrollServiceStub.retrieve.called).toBeTruthy();
        expect(comp.demoInfiniteScrolls[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
      });

      it('should not load a page if the page is the same as the previous page', () => {
        // WHEN
        comp.page = 1;

        // THEN
        expect(demoInfiniteScrollServiceStub.retrieve.called).toBeFalsy();
      });

      it('should re-initialize the page', async () => {
        // GIVEN
        comp.page = 2;
        await comp.$nextTick();
        demoInfiniteScrollServiceStub.retrieve.reset();
        demoInfiniteScrollServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

        // WHEN
        comp.clear();
        await comp.$nextTick();

        // THEN
        expect(comp.page).toEqual(1);
        expect(demoInfiniteScrollServiceStub.retrieve.callCount).toEqual(1);
        expect(comp.demoInfiniteScrolls[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
      });

      it('should calculate the sort attribute for a non-id attribute', async () => {
        // WHEN
        comp.propOrder = 'name';
        await comp.$nextTick();

        // THEN
        expect(demoInfiniteScrollServiceStub.retrieve.lastCall.firstArg).toMatchObject({
          sort: ['name,asc', 'id'],
        });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        demoInfiniteScrollServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 'ABC' });

        comp.removeDemoInfiniteScroll();
        await comp.$nextTick(); // clear components

        // THEN
        expect(demoInfiniteScrollServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(demoInfiniteScrollServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
