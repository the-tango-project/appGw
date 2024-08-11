import { defineComponent, provide } from 'vue';

import DemoPaginateService from './flowMs/demo-paginate/demo-paginate.service';
import DemoInfiniteScrollService from './flowMs/demo-infinite-scroll/demo-infinite-scroll.service';
import LocalFormService from '@/entities/form/form.component';
import UserService from '@/entities/user/user.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('demoPaginateService', () => new DemoPaginateService());
    provide('demoInfiniteScrollService', () => new DemoInfiniteScrollService());
    provide('localFormService', () => new LocalFormService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
