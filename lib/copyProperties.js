// Diff can't compare Map instances, so use a raw object
module.exports = function copyProperties(object) {
  const map = Object.create(null);
  if (object !== null && object !== undefined) {
    Object.getOwnPropertyNames(object).forEach(property => {
      if (property === 'caller' || property === 'arguments') return;
      const value = object[property];
      if (typeof value === 'object') {
        map[property] = copyProperties(value);
      }
      // Handle Number.prototype.toString() and Function.prototype.toString(), since deep-diff
      // actually invokes the function...
      else if ((object === Number.prototype || object === Function.prototype || object === Boolean.prototype || object === Date.prototype) && property === 'toString') {
        // silence is golden
      } else {
        map[property] = value;
      }
    });
  };
  return map;
};
