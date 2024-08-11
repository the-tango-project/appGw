import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const DemoPaginate = () => import('@/entities/flowMs/demo-paginate/demo-paginate.vue');
const DemoPaginateUpdate = () => import('@/entities/flowMs/demo-paginate/demo-paginate-update.vue');
const DemoPaginateDetails = () => import('@/entities/flowMs/demo-paginate/demo-paginate-details.vue');

const DemoInfiniteScroll = () => import('@/entities/flowMs/demo-infinite-scroll/demo-infinite-scroll.vue');
const DemoInfiniteScrollUpdate = () => import('@/entities/flowMs/demo-infinite-scroll/demo-infinite-scroll-update.vue');
const DemoInfiniteScrollDetails = () => import('@/entities/flowMs/demo-infinite-scroll/demo-infinite-scroll-details.vue');

const Form = () => import('@/entities/form/form.vue');
const FormUpdate = () => import('@/entities/form/form.update.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'demo-paginate',
      name: 'DemoPaginate',
      component: DemoPaginate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'demo-paginate/new',
      name: 'DemoPaginateCreate',
      component: DemoPaginateUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'demo-paginate/:demoPaginateId/edit',
      name: 'DemoPaginateEdit',
      component: DemoPaginateUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'demo-paginate/:demoPaginateId/view',
      name: 'DemoPaginateView',
      component: DemoPaginateDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'demo-infinite-scroll',
      name: 'DemoInfiniteScroll',
      component: DemoInfiniteScroll,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'demo-infinite-scroll/new',
      name: 'DemoInfiniteScrollCreate',
      component: DemoInfiniteScrollUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'demo-infinite-scroll/:demoInfiniteScrollId/edit',
      name: 'DemoInfiniteScrollEdit',
      component: DemoInfiniteScrollUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'demo-infinite-scroll/:demoInfiniteScrollId/view',
      name: 'DemoInfiniteScrollView',
      component: DemoInfiniteScrollDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'form',
      name: 'Form',
      component: Form,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'form/new',
      name: 'FormCreate',
      component: FormUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'form/:formId/edit',
      name: 'FormEdit',
      component: FormUpdate,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
