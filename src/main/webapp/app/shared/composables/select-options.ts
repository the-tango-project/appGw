import { computed, defineComponent, inject, ref, type Ref } from 'vue';

import { useI18n } from 'vue-i18n';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { Option, type IOption } from '@/shared/model/ui/option.model';

const useSelectOptions = () => ({
  tipoComponente() {
    return this.mapKeys('apeironGwApp.TipoComponente.', TipoComponente);
  },

  mapKeys(i18nkey: string, element: any) {
    const { t: t$ } = useI18n();
    const options = Object.keys(element).map(key => {
      const opt = new Option();
      opt.value = key;
      opt.text = t$(i18nkey + key).toString();
      return opt;
    });
    options.unshift({ value: null, text: t$('global.form.selectone.placeholder'), disabled: true });
    return options;
  },
});

export default useSelectOptions;
