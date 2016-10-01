# depalyzer

A tool which determines whether an npm module modifies the built-in javascript types like `Array`, `Object`, etc.

## Installation

You can either install `depalyzer` globally:

```
sudo npm install -g depalyzer
```

This allows you to use it like traditional binary:

```
depalyzer true-html-escape
```

Or install it locally:

```
npm install depalyzer
```

And run it as follows:

```
./node_modules/.bin/depalyzer true-html-escape
```

## Usage

```
depalyzer [--verbose] module-name
```

* `module-name`: the name of the npm module to be analyzed
* `--verbose`: optionally enable detailed output

## Output

For a module with > 1 modification to build-in types, the script will exit with the code `1` and you'll see output like:

```
padowan@pure-deps> ./bin/depalyzer true-html-escape
true-html-escape includes 3 dependencies...
✓ 3 globals were not modified.
   ✓ Object.prototype
   ✓ Boolean.prototype
   ✓ Math
✗ FAILURE: 10 globals were modified, with 623 total modifications.
   ✗ Array
   ✗ Array.prototype
   ✗ Object
   ✗ Number
   ✗ Number.prototype
   ✗ Function
   ✗ Function.prototype
   ✗ Boolean
   ✗ Date
   ✗ Date.prototype
```

For a module without modifications, the script will exit with code `0` and you'll see output like:

```
padowan@pure-deps> ./bin/depalyzer escape-html
escape-html includes 0 dependencies...
✓ Success: No globals were modified.
   ✓ Array
   ✓ Array.prototype
   ✓ Object
   ✓ Object.prototype
   ✓ Number
   ✓ Number.prototype
   ✓ Function
   ✓ Function.prototype
   ✓ Boolean
   ✓ Boolean.prototype
   ✓ Date
   ✓ Date.prototype
   ✓ Math
 ```

## Why?

It's hard to know what you'll get when you install a new npm module. This tool allows you to quickly check for modules which modify the built-in types, like the *623* additions and modifications made by the `true-html-escape` library to types like `Array` and `Date`.

These can and *do* have real side-effects on your software.  This tool helps developers avoid those side-effects.

May the force be with you in your journey for pure dependencies young padowan.

## What's next:

* [ ] Tests!
* [ ] Expand the types which are monitored for mutations
* [ ] Options for disabling color, fancy checks n' such
* [ ] Expose API for programmatic use, something like:

  ```javascript
  const depalyzer = require('depalyzer');
  const results = depalyzer('true-html-escape');
  if (results.hasGlobalModifications()) {
    console.error('Oh noes!')
  }
  ```
