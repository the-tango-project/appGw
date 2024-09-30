import { defineComponent, provide } from 'vue';

import DemoPaginateService from './flowMs/demo-paginate/demo-paginate.service';
import DemoInfiniteScrollService from './flowMs/demo-infinite-scroll/demo-infinite-scroll.service';
import LocalFormService from '@/entities/form/form.service';
import SolucionService from '@/entities/solucion/solucion.service';
import RuleService from '@/entities/solucion/rule.service';
import ActionService from '@/entities/solucion/action.service';
import ScriptService from '@/shared/script/script.service';
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
    provide('solucionService', () => new SolucionService());
    provide('ruleService', () => new RuleService());
    provide('actionService', () => new ActionService());
    provide('scriptService', () => new ScriptService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
