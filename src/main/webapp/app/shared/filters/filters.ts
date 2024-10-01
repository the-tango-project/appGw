import * as dateUtils from '@/shared/date/date-utils';

export function addFilters() {
  function timeElapsed(value: any) {
    return dateUtils.timeElapsed(value);
  }

  function formatDate(value: any) {
    return dateUtils.formatDate(value);
  }

  function duration(value: any) {
    return dateUtils.duration(value);
  }

  function truncate(value: any) {
    if (value) {
      return value.substring(0, 7);
    }
    return '';
  }

  function formatUtc(value: any) {
    return dateUtils.formatUtc(value);
  }

  return { timeElapsed, formatDate, duration, truncate, formatUtc };
}
