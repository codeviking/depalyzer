/**
 * Returns an object where each key is a member of object and value is a dereferenced copy of the
 * associated value. This allows us to compare a given global before and after including a module
 * by producing a map of an object's original state.
 * @param {object} object the subject object
 * @returns {object}
 */
module.exports = function getPropertyMap(object) {
  const map = Object.create(null);
  if (object !== null && object !== undefined) {
    Object.getOwnPropertyNames(object).forEach(property => {
      if (property === 'caller' || property === 'arguments') return;
      const value = object[property];
      if (typeof value === 'object') {
        map[property] = getPropertyMap(value);
      }
      // HACK: Attempting to inspect the toString implementation of these prototypes triggers
      // an error, as deep-diff attempts to execute them. Exclude them for now to prevent this.
      // TODO: Figure out a way to watch for modifications to these APIs as well.
      else if (
        (
          object === Number.prototype ||
          object === Function.prototype ||
          object === Boolean.prototype ||
          object === Date.prototype
        ) &&
        property === 'toString'
      ) {
        // Silence is golden
      } else {
        map[property] = value;
      }
    });
  };
  return map;
};
