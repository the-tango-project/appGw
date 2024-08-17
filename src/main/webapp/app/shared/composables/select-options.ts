import { computed, defineComponent, inject, ref, type Ref } from 'vue';

import { useI18n } from 'vue-i18n';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { Option, type IOption } from '@/shared/model/ui/option.model';
import { TipoMenu } from '../model/enumerations/tipo-menu.model';
import { MenuElement } from '@/shared/model/enumerations/menu-element.model';

const useSelectOptions = () => ({
  tipoComponente(): Array<IOption> {
    return this.mapKeys('apeironGwApp.TipoComponente.', TipoComponente);
  },

  tipoMenu(): Array<IOption> {
    return this.mapKeys('apeironGwApp.MenuElement.', MenuElement);
  },
  tipoComponent(): Array<IOption> {
    return this.mapKeys('apeironGwApp.MenuElement.', MenuElement);
  },

  mapKeys(i18nkey: string, element: any): Array<IOption> {
    const { t: t$ } = useI18n();
    const options = Object.keys(element).map(key => {
      return new Option(key, t$(i18nkey + key).toString());
    });
    options.unshift({ value: null, text: t$('global.form.selectone.placeholder'), disabled: true });
    return options;
  },
});

export default useSelectOptions;
