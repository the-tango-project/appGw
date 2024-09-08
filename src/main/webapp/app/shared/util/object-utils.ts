/**
 * SolucionUtils for common operation in the Solucion object
 */
const useObjectUtils = () => ({
  /**
   * Clone an object
   */
  clone(object: Object): Object {
    return JSON.parse(JSON.stringify(object));
  },
});

export default useObjectUtils;
