const chalk = require('chalk');

/**
 * Representation of a given module's modifications (or lack thereof) of buillt-in types.
 */
class Summary {
  constructor() {
    this.unmodified = [];
    this.modified = [];
  }
  /**
   * Adds a global which was modified.
   * @param {ModifiedGlobal} modified
   * @returns {Summary}
   */
  addModifiedGlobal(modified) {
    this.modified.push(modified)
    return this;
  }
  /**
   * Adds a global which wasn't modified.
   * @param {string} name the name of the global that wasn't modified.
   * @returns {Summary}
   */
  addUnmodifiedGlobal(name) {
    this.unmodified.push(name);
    return this;
  }
  /**
   * Returns a human-readable summary of all globals that were modified and those which weren't.
   * @param {boolean} [verbose=false] if true, details regarding the specific modfications to each
   * global are included.
   * @returns {string}
   */
  toString(verbose) {
    const unmodifiedCount = this.unmodified.length;
    const modifiedCount = this.modified.length;
    const totalModificationsCount = this.modified.reduce((sum, mod) => sum + mod.count, 0);
    const unmodifiedDetails = this.unmodified.map(name => {
      return `${chalk.green('✓')} ${chalk.yellow(name)}`
    }).join(Summary.DETAILS_SPACER);

    if (modifiedCount === 0) {
      const header = chalk.green('✓ Success: No globals were modified.');
      return [ header, unmodifiedDetails ].join(Summary.DETAILS_SPACER);
    } else {
      const header = chalk.red(
        `✗ FAILURE: ${modifiedCount} globals were modified, with ${totalModificationsCount} total modifications.`
      )
      const modifiedDetails = this.modified.map(mod => mod.toString(verbose)).join(Summary.DETAILS_SPACER);

      const unmodifiedHeader = chalk.green(`✓ ${unmodifiedCount} globals were not modified.`);
      const unmodified = [ unmodifiedHeader, unmodifiedDetails ].join(Summary.DETAILS_SPACER);
      const modified = [ header, modifiedDetails ].join(Summary.DETAILS_SPACER);
      return [ unmodified, modified ].join('\n');
    }
  }
}

Summary.DETAILS_SPACER = '\n   ';

module.exports = Summary;
