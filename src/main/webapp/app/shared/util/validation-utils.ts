/**
 * Validate if a object is not empty. It is considered empty if is null, undefined, array.length === 0 or string = ''
 *
 * @param object is the elemento to test
 * @returns true if not empty, otherwise false
 */
export function isArrayEmpty<T>(array: T[]): boolean {
  return array === null || array === undefined || array.length === 0;
}

/**
 * This function validate if a element is a number
 * @param element
 * @returns if the value es greater or equals to zero
 */
export function isGreaterOrEqualToZero(element: number | null | undefined): boolean {
  return isNotNull(element) && isNumber(element) && element! >= 0;
}

export function isNotNull(element: any): boolean {
  return !isNull(element);
}
export function isNull(element: any): boolean {
  return element === null || element === undefined;
}

export function isNumber(element: any): boolean {
  return typeof element === 'number';
}
