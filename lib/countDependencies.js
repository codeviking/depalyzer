/**
 * Recursively counts the dependencies referenced by the provided module.
 * @param {string} moduleName
 * @returns {number}
 */
module.exports = function countDependencies(moduleName) {
  const manifest = require(`${process.cwd()}/node_modules/${moduleName}/package.json`);
  const dependencies = Object.keys(manifest.dependencies);
  return dependencies.reduce((count, currentDependency) => {
    return count + 1 + countDependencies(currentDependency);
  }, 0);
}
