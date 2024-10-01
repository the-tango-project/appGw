import { defineComponent, type Ref, ref } from 'vue';

import { faker } from '@faker-js/faker';

export default defineComponent({
  compatConfig: { MODE: 3, COMPONENT_V_MODEL: false },
  name: 'AccordionComponent',
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'chat-left',
    },
  },
  setup(props, { emit }) {
    const id: Ref<string> = ref(faker.database.mongodbObjectId());
    return {
      id,
    };
  },
});
