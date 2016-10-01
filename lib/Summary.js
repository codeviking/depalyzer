const chalk = require('chalk');

class Summary {
  constructor() {
    this.unmodified = [];
    this.modified = [];
  }
  addModifiedGlobal(modified) {
    this.modified.push(modified)
  }
  addUnmodifiedGlobal(name) {
    this.unmodified.push(name);
  }
  toString(verbose) {
    const unmodifiedCount = this.unmodified.length;
    const modifiedCount = this.modified.length;
    const totalModificationsCount = this.modified.reduce((sum, mod) => sum + mod.count, 0);

    const getUnmodifiedDetails = () => {
      return this.unmodified.map(name => `${chalk.green('✓')} ${chalk.yellow(name)}`).join(Summary.DETAILS_SPACER);
    };
    const getModifiedDetails = () => {
      return this.modified.map(mod => mod.toString(verbose)).join(Summary.DETAILS_SPACER);
    };

    if (modifiedCount === 0) {
      const header = chalk.green('✓ Success: No globals were modified.');
      return [ header, getUnmodifiedDetails() ].join(Summary.DETAILS_SPACER);
    } else {
      const header = chalk.red(`✗ FAILURE: ${modifiedCount} globals were modified, with ${totalModificationsCount} total modifications.`)
      const unmodifiedHeader = chalk.green(`✓ ${unmodifiedCount} globals were not modified.`);
      const unmodified = [ unmodifiedHeader, getUnmodifiedDetails() ].join(Summary.DETAILS_SPACER);
      const modified = [ header, getModifiedDetails() ].join(Summary.DETAILS_SPACER);
      return [ unmodified, modified ].join('\n');
    }
  }
}

Summary.DETAILS_SPACER = '\n   ';

module.exports = Summary;
