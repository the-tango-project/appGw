import { useI18n } from 'vue-i18n';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { Option, type IOption } from '@/shared/model/ui/option.model';
import { MenuElement } from '@/shared/model/enumerations/menu-element.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';

const useSelectOptions = () => ({
  tipoComponente(): Array<IOption> {
    return this.mapKeys('apeironGwApp.TipoComponente.', TipoComponente);
  },

  tipoMenu(): Array<IOption> {
    return this.mapKeys('apeironGwApp.MenuElement.', MenuElement);
  },

  states(): Array<IOption> {
    return this.mapKeys('archeApp.EstadoSolicitud.', EstadoSolicitud);
  },

  mapKeys(i18nkey: string, element: any, notIncludeHeader?: boolean): Array<IOption> {
    const { t: t$ } = useI18n();
    const options = Object.keys(element).map(key => {
      return new Option(key, t$(i18nkey + key).toString());
    });
    if (!notIncludeHeader) {
      options.unshift({ value: null, text: t$('global.form.selectone.placeholder'), disabled: true });
    }
    return options;
  },
});

export default useSelectOptions;
