const chalk = require('chalk');

class ModifiedGlobal {
  constructor({ name, modifications }) {
    this.name = name;
    this.modifications = modifications;
    this.count = this.modifications.length;
  }
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
