# depalyzer

A tool which determines whether an npm module modifies the built-in javascript types like `Array`, `Object`, etc.

## Installation

```
sudo npm install -g depalyzer
```

## Usage

```
depalyzer [--verbose] module-name
```

* `module-name`: the name of the npm module to be analyzed
* `--verbose`: optionally enable detailed output

## Why?

It's hard to know what you'll get when you install a new npm module. This tool allows you to quickly check for modules which modify the built-in types, like the *623* additions and modifications made by the `true-html-escape` library to types like `Array` and `Date`.

These can and *do* have real side-effects on your software.  This tool helps developers avoid those side-effects.

May the force be with you in your journey for pure dependencies young padowan.

## TODO

* [ ] Test coverage
* [ ] Expand the types which are monitored for mutations
