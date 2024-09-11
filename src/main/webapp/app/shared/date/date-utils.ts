import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_FORMAT_DDBMMBYY = 'DD/MM/YY';
export const DATE_FORMAT_DBMBYYYY = 'D/M/YYYY';
export const HTML_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_TIME_LONG_FORMAT = 'YYYY-MM-DDTHH:mm';
export const DATE_TIME_SEGUNDOS_FORMAT = 'YYYY-MM-DD HH:mm:ss';

import { formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';

dayjs.extend(utc);

export function defaultFormat(date: any) {
  return dayjs(date).format(DATE_FORMAT);
}

export function fromMultiFormat(date: any) {
  let parseDate = dayjs(date, DATE_FORMAT);

  if (parseDate.isValid()) {
    return parseDate.format(HTML_DATE_FORMAT);
  } else {
    parseDate = dayjs(date, DATE_FORMAT_DDBMMBYY);

    if (parseDate.isValid()) {
      return parseDate.format(HTML_DATE_FORMAT);
    } else {
      parseDate = dayjs(date, DATE_FORMAT_DBMBYYYY);

      if (parseDate.isValid()) {
        return parseDate.format(HTML_DATE_FORMAT);
      }
    }
  }

  return null;
}

export function formatUtc(date: any) {
  return dayjs(date).isValid() ? dayjs(date).utc().format(DATE_FORMAT) : '';
}

export function formatDate(date: any) {
  return dayjs(date).format(DATE_TIME_FORMAT);
}

export function formatDateHoraSegundos(date: any) {
  return dayjs(date).format(DATE_TIME_SEGUNDOS_FORMAT);
}

export function duration(date: any) {
  if (date) {
    const formatted = dayjs.duration(date).humanize();
    if (formatted) {
      return formatted;
    }
    return date;
  }
  return '';
}

export function timeElapsed(date: any) {
  if (date) {
    return formatRelative(new Date(date), new Date(), { locale: es });
  }
  return '';
}

export function formatAndValidateDate(date: any) {
  if (!date) {
    return '';
  }

  //TODO Pasar esta expresión a la configuración de una solución y no dejar en código duro, ver sección Cómo agregar columnas dinámicamente en la documentación del ápeiron
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return regex.test(date.toString()) ? formatUtc(date) : date;
}

export function stringDateInUtcComparator(leftDateString: any, rightDateString: any) {
  return new Date(leftDateString).getTime() - new Date(rightDateString).getTime();
}

export function convertDateTimeFromServer(date: Date): string | null {
  return date && dayjs(date).isValid() ? dayjs(date).format(DATE_TIME_LONG_FORMAT) : null;
}

export function updateInstantField(dateField: Date | null): string | null {
  if (dateField) {
    return dayjs(dateField).utc().format();
  } else {
    return null;
  }
}
