import { VueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background';

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

export function initVueflow(vue: any) {
  vue.component('vue-flow', VueFlow);
  vue.component('panel', Panel);
  vue.component('background', Background);
  //vue.component('vue-flow', VueFlow);
}
