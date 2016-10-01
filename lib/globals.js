/**
 * The list of all objects to verify aren't mutated.
 * TODO: Expand this list!
 */
module.exports = new Map([
  ['Array', Array.prototype],
  ['Array.prototype', Object.getPrototypeOf([])],
  ['Object', Object],
  ['Object.prototype', Object.getPrototypeOf({})],
  ['Number', Number],
  ['Number.prototype', Object.getPrototypeOf(1)],
  ['Function', Function],
  ['Function.prototype', Object.getPrototypeOf(function() {})],
  ['Boolean', Boolean],
  ['Boolean.prototype', Object.getPrototypeOf(true)],
  ['Date', Date],
  ['Date.prototype', Object.getPrototypeOf(new Date())],
  ['Math', Math]
]);
