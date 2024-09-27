import { useI18n } from 'vue-i18n';
import { TipoComponente } from '@/shared/model/enumerations/tipo-componente.model';
import { Option, type IOption } from '@/shared/model/ui/option.model';
import { MenuElement } from '@/shared/model/enumerations/menu-element.model';
import { EstadoSolicitud } from '@/shared/model/enumerations/estado-solicitud.model';
import { TipoAviso } from '@/shared/model/enumerations/tipo-aviso.model';
import { TipoAccion } from '../model/enumerations/tipo-accion.model';
import type { IEstado } from '../model/proceso/estado.model';
import useSolucionUtils from '../solucion/solucion-utils.service';
import { TipoSolucion } from '../model/enumerations/tipo-solucion.model';
import { TipoAcceso } from '../model/enumerations/tipo-acceso.model';
import { RolAutoridad } from '../model/enumerations/rol-autoridad.model';
import { TipoReglaFiltro } from '../model/enumerations/tipo-regla-filtro.model';

// by convention, composable function names start with "use"
export function useSelectOptions() {
  const { t: t$ } = useI18n();
  const solucionUtils = useSolucionUtils();

  const stateOptions = states();
  const componenteOptions = tipoComponente();
  const menuOptions = tipoMenu();
  const tipoAvisoOptions = tipoAviso();
  const actionOptions = actions();
  const tipoSolutionOptions = tipoSolutions();
  const tipoAccessOptions = tipoAccess();
  const authorityOptions = authorities();
  const tipoFilterRulesOptions = tipoFilterRules();

  function tipoSolutions(): Array<IOption> {
    return mapKeys('apeironGwApp.TipoSolucion.', TipoSolucion, false, '.simpleName');
  }

  function tipoFilterRules(): Array<IOption> {
    return mapKeys('apeironGwApp.TipoReglaFiltro.', TipoReglaFiltro);
  }

  function tipoAccess(): Array<IOption> {
    return mapKeys('apeironGwApp.TipoAcceso.', TipoAcceso);
  }

  function authorities(): Array<IOption> {
    return mapKeys('apeironGwApp.RolAutoridad.', RolAutoridad, true);
  }

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

  function mapKeys(i18nkey: string, element: any, notInludeHeader?: boolean, append?: string): Array<IOption> {
    const options = Object.keys(element).map(key => {
      const keyLang = i18nkey + key + (append ?? '');
      return new Option(key, t$(keyLang).toString(), keyLang);
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
  return {
    stateOptions,
    componenteOptions,
    menuOptions,
    tipoAvisoOptions,
    actionOptions,
    tipoSolutionOptions,
    tipoAccessOptions,
    authorityOptions,
    tipoFilterRulesOptions,
    actionByEstateOptions,
  };
}
