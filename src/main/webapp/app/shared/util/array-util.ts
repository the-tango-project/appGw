/**
 *
 * Función que divide un Array en <m> subarrays de máximo <n> elementos.
 * El número de <m> subarrays se infiere a partir del número <n> máximo de
 * elementos que debe de tener cada subarray y el tamaño el array original
 *
 * @param array array que se va a dividir en m subarrays de máximo n elementos
 * @param n número máximo de elementos que deberá de contener cada subarray
 * @returns
 */
export function splitInChunks<T>(array: T[], n: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += n) {
    result.push(array.slice(i, i + n));
  }
  return result;
}
