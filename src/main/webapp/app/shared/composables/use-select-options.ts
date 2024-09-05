import { useI18n } from 'vue-i18n';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { Option, type IOption } from '@/shared/model/ui/option.model';
import { MenuElement } from '@/shared/model/enumerations/menu-element.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { TipoAviso } from '@/shared/model/enumerations/tipo-aviso.model';

// by convention, composable function names start with "use"
export function useSelectOptions() {
  const { t: t$ } = useI18n();

  const stateOptions = states();
  const componenteOptions = tipoComponente();
  const menuOptions = tipoMenu();
  const tipoAvisoOptions = tipoAviso();

  function states(): Array<IOption> {
    return mapKeys('archeApp.EstadoSolicitud.', EstadoSolicitud);
  }

  function tipoComponente(): Array<IOption> {
    return mapKeys('apeironGwApp.TipoComponente.', TipoComponente);
  }

  function tipoMenu(): Array<IOption> {
    return mapKeys('apeironGwApp.MenuElement.', MenuElement);
  }

  function tipoAviso(): Array<IOption> {
    return mapKeys('apeironGwApp.TipoAviso.', TipoAviso);
  }

  function mapKeys(i18nkey: string, element: any): Array<IOption> {
    const options = Object.keys(element).map(key => {
      return new Option(key, t$(i18nkey + key).toString(), i18nkey + key);
    });
    options.unshift({
      value: null,
      text: t$('global.form.selectone.placeholder'),
      langKey: 'global.form.selectone.placeholder',
      disabled: true,
    });
    return options;
  }

  // expose managed state as return value
  return { stateOptions, componenteOptions, menuOptions, tipoAvisoOptions };
}
