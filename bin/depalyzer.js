#!/usr/bin/env node
'use strict';

const getPropertyMap = require('../lib/getPropertyMap');
const countDependencies = require('../lib/countDependencies');
const Summary = require('../lib/Summary');
const ModifiedGlobal = require('../lib/ModifiedGlobal');
const globals = require('../lib/globals');

const cp = require('child_process')
const clone = require('clone');
const chalk = require('chalk');
const fs = require('fs');
const diff = require('deep-diff').diff;
const minimist = require('minimist');

// Exit codes
const ExitCode = {
  SUCCESS: 0,
  /** A failure occurs if > 1 global is modified */
  FAILURE: 1,
  INVALID_ARGS: 2
};
Object.freeze(ExitCode);

// TODO: process multiple modules via one invocation
// TODO: process a single package.json and evaluate all dependencies
const args = minimist(process.argv.slice(2));

function usage() {
  return fs.readFileSync(`${__dirname}/usage.txt`, 'utf-8');
}

if (args.h || args.help) {
  console.log(usage());
  process.exit(ExitCode.SUCCESS);
}

const moduleName = args._.shift();
if (!moduleName) {
  console.error(usage());
  process.exit(ExitCode.INVALID_ARGS);
}

// Create a copy of each object's properties and methods prior to loading the dependency
const originals = new Map();
globals.forEach((object, name) => {
  originals.set(name, getPropertyMap(object));
});

// Install the dependency
try {
  cp.execSync(`npm install ${moduleName}`, { stdio: 'ignore' });
  require(moduleName);
} catch(e) {
  console.error(`${chalk.red('Error:')} Unable to install module ${chalk.yellow(moduleName)}. Did you spell the module name correctly?`);
  process.exit(ExitCode.INVALID_ARGS);
}

// Count the number of dependencies included by this dependency
// TODO: Count transitive dependnecies as well, and provide a flag for disabling this ability
const dependencyCount = countDependencies(moduleName);
console.log(`${chalk.yellow(moduleName)} ${chalk.cyan('includes')} ${chalk.yellow(dependencyCount)} ${chalk.cyan('dependencies...')}`);

// Examine each global and examine whether it was modified by the loaded dependency
const summary = new Summary();
globals.forEach((object, name) => {
  const differences = diff(originals.get(name), getPropertyMap(object));
  if (Array.isArray(differences)) {
    summary.addModifiedGlobal(
      new ModifiedGlobal({
        name: name,
        modifications: differences
      })
    );
  } else {
    summary.addUnmodifiedGlobal(name);
  }
});

// Output
console.log(summary.toString(args.verbose || args.v));

// Uninstall the dependency
try {
  cp.execSync(`npm uninstall ${moduleName}`, { stdio: 'ignore' });
} catch (err) {
  console.warn(`${chalk.orange('Warning:')} Unable to uninstall module ${chalk.yellow(moduleName)}. The resulting artifact will be left in node_modules.`);
}

if (summary.modified.length > 0) {
  process.exit(ExitCode.FAILURE);
} else {
  process.exit(ExitCode.SUCCESS);
}
