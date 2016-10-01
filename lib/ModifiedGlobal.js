const chalk = require('chalk');

/**
 * Representation of a modified global / built-in type.
 */
class ModifiedGlobal {
  /**
   * @param {string} name the object name
   * @param {object[]} modifications array of modifications
   */
  constructor({ name, modifications }) {
    this.name = name;
    this.modifications = modifications;
    this.count = this.modifications.length;
  }
  /**
   * Produces a human-readable summary of the modifications.
   * @param {boolean} [verbose=false] if true, the specific members which were modified, added
   * or removed will be included in the output.
   * @returns {string}
   */
  toString(verbose) {
    const header = `${chalk.red('✗')} ${chalk.yellow(this.name)}`;
    if (verbose) {
      const details = this.modifications.map(modification => {
        const path = modification.path.join('.');
        switch (modification.kind) {
          case 'N': {
            return `+ added: ${path}`;
          }
          case 'E': {
            return `~ modified: ${path}`;
          }
          case 'D': {
            return `- removed: ${path}`;
          }
          case 'A': {
            return `~ modified values of: ${path}`;
          }
        }
      });
      details.unshift(header);
      return details.join(ModifiedGlobal.SPACER);
    } else {
      return header;
    }
  }
}

ModifiedGlobal.SPACER = '\n     ';

module.exports = ModifiedGlobal;
