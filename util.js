function isPrimitiveOrNull(value) {
  if (null === value) return true;
  switch (typeof value) {
    case 'undefined':
    case 'string':
    case 'number':
    case 'boolean':
    case 'symbol':
    case 'function':
      return true;
    case 'object':
      return value instanceof Date;
  }
  return false;
}
function isNumber(value) {
  return 'number' === typeof value;
}
function isUndefined(value) {
  return 'undefined' === typeof value;
}
function isNullOrUndefined(value) {
  return isUndefined(value) || null === value;
}
function isObject(value) {
  return !isPrimitiveOrNull(value) && 'object' === typeof value;
}
function isIterable(obj, ignoreStrings = true) {
  if (isNullOrUndefined(obj)) return false;
  if ('string' === typeof obj) return !ignoreStrings;
  return Boolean(obj[Symbol.iterator]);
}
