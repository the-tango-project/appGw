import { useI18n } from 'vue-i18n';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { Option, type IOption } from '@/shared/model/ui/option.model';
import { MenuElement } from '@/shared/model/enumerations/menu-element.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { TipoAviso } from '@/shared/model/enumerations/tipo-aviso.model';
import { TipoAccion } from '../model/enumerations/tipo-accion.model';
import type { IEstado } from '../model/proceso/estado.model';
import useSolucionUtils from '../solucion/solucion-utils.service';

// by convention, composable function names start with "use"
export function useSelectOptions() {
  const { t: t$ } = useI18n();
  const solucionUtils = useSolucionUtils();

  const stateOptions = states();
  const componenteOptions = tipoComponente();
  const menuOptions = tipoMenu();
  const tipoAvisoOptions = tipoAviso();
  const actionOptions = actions();

  function actions(): Array<IOption> {
    return mapKeys('apeironGwApp.TipoAccion.', TipoAccion, true);
  }

  const actionByEstateOptions = function actionsByState(estados: IEstado[], currentState: string | undefined): Array<IOption> {
    const actions = solucionUtils.resolveActions(estados, currentState);
    const i18nkey = 'apeironGwApp.TipoAccion.';
    if (actions && actions.length > 0) {
      return actions.map(action => new Option(action, t$(i18nkey + action).toString(), i18nkey + action));
    }
    return [];
  };

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

  function mapKeys(i18nkey: string, element: any, notInludeHeader?: boolean): Array<IOption> {
    const options = Object.keys(element).map(key => {
      return new Option(key, t$(i18nkey + key).toString(), i18nkey + key);
    });
    if (!notInludeHeader) {
      options.unshift({
        value: null,
        text: t$('global.form.selectone.placeholder'),
        langKey: 'global.form.selectone.placeholder',
        disabled: true,
      });
    }

    return options;
  }

  // expose managed state as return value
  return { stateOptions, componenteOptions, menuOptions, tipoAvisoOptions, actionOptions, actionByEstateOptions };
}
