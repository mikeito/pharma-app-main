"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/property-expr";
exports.ids = ["vendor-chunks/property-expr"];
exports.modules = {

/***/ "(ssr)/./node_modules/property-expr/index.js":
/*!*********************************************!*\
  !*** ./node_modules/property-expr/index.js ***!
  \*********************************************/
/***/ ((module) => {

eval("/**\n * Based on Kendo UI Core expression code <https://github.com/telerik/kendo-ui-core#license-information>\n */\n\n\nfunction Cache(maxSize) {\n  this._maxSize = maxSize\n  this.clear()\n}\nCache.prototype.clear = function () {\n  this._size = 0\n  this._values = Object.create(null)\n}\nCache.prototype.get = function (key) {\n  return this._values[key]\n}\nCache.prototype.set = function (key, value) {\n  this._size >= this._maxSize && this.clear()\n  if (!(key in this._values)) this._size++\n\n  return (this._values[key] = value)\n}\n\nvar SPLIT_REGEX = /[^.^\\]^[]+|(?=\\[\\]|\\.\\.)/g,\n  DIGIT_REGEX = /^\\d+$/,\n  LEAD_DIGIT_REGEX = /^\\d/,\n  SPEC_CHAR_REGEX = /[~`!#$%\\^&*+=\\-\\[\\]\\\\';,/{}|\\\\\":<>\\?]/g,\n  CLEAN_QUOTES_REGEX = /^\\s*(['\"]?)(.*?)(\\1)\\s*$/,\n  MAX_CACHE_SIZE = 512\n\nvar pathCache = new Cache(MAX_CACHE_SIZE),\n  setCache = new Cache(MAX_CACHE_SIZE),\n  getCache = new Cache(MAX_CACHE_SIZE)\n\nvar config\n\nmodule.exports = {\n  Cache: Cache,\n\n  split: split,\n\n  normalizePath: normalizePath,\n\n  setter: function (path) {\n    var parts = normalizePath(path)\n\n    return (\n      setCache.get(path) ||\n      setCache.set(path, function setter(obj, value) {\n        var index = 0\n        var len = parts.length\n        var data = obj\n\n        while (index < len - 1) {\n          var part = parts[index]\n          if (\n            part === '__proto__' ||\n            part === 'constructor' ||\n            part === 'prototype'\n          ) {\n            return obj\n          }\n\n          data = data[parts[index++]]\n        }\n        data[parts[index]] = value\n      })\n    )\n  },\n\n  getter: function (path, safe) {\n    var parts = normalizePath(path)\n    return (\n      getCache.get(path) ||\n      getCache.set(path, function getter(data) {\n        var index = 0,\n          len = parts.length\n        while (index < len) {\n          if (data != null || !safe) data = data[parts[index++]]\n          else return\n        }\n        return data\n      })\n    )\n  },\n\n  join: function (segments) {\n    return segments.reduce(function (path, part) {\n      return (\n        path +\n        (isQuoted(part) || DIGIT_REGEX.test(part)\n          ? '[' + part + ']'\n          : (path ? '.' : '') + part)\n      )\n    }, '')\n  },\n\n  forEach: function (path, cb, thisArg) {\n    forEach(Array.isArray(path) ? path : split(path), cb, thisArg)\n  },\n}\n\nfunction normalizePath(path) {\n  return (\n    pathCache.get(path) ||\n    pathCache.set(\n      path,\n      split(path).map(function (part) {\n        return part.replace(CLEAN_QUOTES_REGEX, '$2')\n      })\n    )\n  )\n}\n\nfunction split(path) {\n  return path.match(SPLIT_REGEX) || ['']\n}\n\nfunction forEach(parts, iter, thisArg) {\n  var len = parts.length,\n    part,\n    idx,\n    isArray,\n    isBracket\n\n  for (idx = 0; idx < len; idx++) {\n    part = parts[idx]\n\n    if (part) {\n      if (shouldBeQuoted(part)) {\n        part = '\"' + part + '\"'\n      }\n\n      isBracket = isQuoted(part)\n      isArray = !isBracket && /^\\d+$/.test(part)\n\n      iter.call(thisArg, part, isBracket, isArray, idx, parts)\n    }\n  }\n}\n\nfunction isQuoted(str) {\n  return (\n    typeof str === 'string' && str && [\"'\", '\"'].indexOf(str.charAt(0)) !== -1\n  )\n}\n\nfunction hasLeadingNumber(part) {\n  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX)\n}\n\nfunction hasSpecialChars(part) {\n  return SPEC_CHAR_REGEX.test(part)\n}\n\nfunction shouldBeQuoted(part) {\n  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part))\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcHJvcGVydHktZXhwci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLElBQUk7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixXQUFXO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21vc2EtYmx1ZS8uL25vZGVfbW9kdWxlcy9wcm9wZXJ0eS1leHByL2luZGV4LmpzP2YxMDgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCYXNlZCBvbiBLZW5kbyBVSSBDb3JlIGV4cHJlc3Npb24gY29kZSA8aHR0cHM6Ly9naXRodWIuY29tL3RlbGVyaWsva2VuZG8tdWktY29yZSNsaWNlbnNlLWluZm9ybWF0aW9uPlxuICovXG4ndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gQ2FjaGUobWF4U2l6ZSkge1xuICB0aGlzLl9tYXhTaXplID0gbWF4U2l6ZVxuICB0aGlzLmNsZWFyKClcbn1cbkNhY2hlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc2l6ZSA9IDBcbiAgdGhpcy5fdmFsdWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxufVxuQ2FjaGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX3ZhbHVlc1trZXldXG59XG5DYWNoZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdGhpcy5fc2l6ZSA+PSB0aGlzLl9tYXhTaXplICYmIHRoaXMuY2xlYXIoKVxuICBpZiAoIShrZXkgaW4gdGhpcy5fdmFsdWVzKSkgdGhpcy5fc2l6ZSsrXG5cbiAgcmV0dXJuICh0aGlzLl92YWx1ZXNba2V5XSA9IHZhbHVlKVxufVxuXG52YXIgU1BMSVRfUkVHRVggPSAvW14uXlxcXV5bXSt8KD89XFxbXFxdfFxcLlxcLikvZyxcbiAgRElHSVRfUkVHRVggPSAvXlxcZCskLyxcbiAgTEVBRF9ESUdJVF9SRUdFWCA9IC9eXFxkLyxcbiAgU1BFQ19DSEFSX1JFR0VYID0gL1t+YCEjJCVcXF4mKis9XFwtXFxbXFxdXFxcXCc7LC97fXxcXFxcXCI6PD5cXD9dL2csXG4gIENMRUFOX1FVT1RFU19SRUdFWCA9IC9eXFxzKihbJ1wiXT8pKC4qPykoXFwxKVxccyokLyxcbiAgTUFYX0NBQ0hFX1NJWkUgPSA1MTJcblxudmFyIHBhdGhDYWNoZSA9IG5ldyBDYWNoZShNQVhfQ0FDSEVfU0laRSksXG4gIHNldENhY2hlID0gbmV3IENhY2hlKE1BWF9DQUNIRV9TSVpFKSxcbiAgZ2V0Q2FjaGUgPSBuZXcgQ2FjaGUoTUFYX0NBQ0hFX1NJWkUpXG5cbnZhciBjb25maWdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIENhY2hlOiBDYWNoZSxcblxuICBzcGxpdDogc3BsaXQsXG5cbiAgbm9ybWFsaXplUGF0aDogbm9ybWFsaXplUGF0aCxcblxuICBzZXR0ZXI6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgdmFyIHBhcnRzID0gbm9ybWFsaXplUGF0aChwYXRoKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHNldENhY2hlLmdldChwYXRoKSB8fFxuICAgICAgc2V0Q2FjaGUuc2V0KHBhdGgsIGZ1bmN0aW9uIHNldHRlcihvYmosIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDBcbiAgICAgICAgdmFyIGxlbiA9IHBhcnRzLmxlbmd0aFxuICAgICAgICB2YXIgZGF0YSA9IG9ialxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxlbiAtIDEpIHtcbiAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2luZGV4XVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHBhcnQgPT09ICdfX3Byb3RvX18nIHx8XG4gICAgICAgICAgICBwYXJ0ID09PSAnY29uc3RydWN0b3InIHx8XG4gICAgICAgICAgICBwYXJ0ID09PSAncHJvdG90eXBlJ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialxuICAgICAgICAgIH1cblxuICAgICAgICAgIGRhdGEgPSBkYXRhW3BhcnRzW2luZGV4KytdXVxuICAgICAgICB9XG4gICAgICAgIGRhdGFbcGFydHNbaW5kZXhdXSA9IHZhbHVlXG4gICAgICB9KVxuICAgIClcbiAgfSxcblxuICBnZXR0ZXI6IGZ1bmN0aW9uIChwYXRoLCBzYWZlKSB7XG4gICAgdmFyIHBhcnRzID0gbm9ybWFsaXplUGF0aChwYXRoKVxuICAgIHJldHVybiAoXG4gICAgICBnZXRDYWNoZS5nZXQocGF0aCkgfHxcbiAgICAgIGdldENhY2hlLnNldChwYXRoLCBmdW5jdGlvbiBnZXR0ZXIoZGF0YSkge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgIGxlbiA9IHBhcnRzLmxlbmd0aFxuICAgICAgICB3aGlsZSAoaW5kZXggPCBsZW4pIHtcbiAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsIHx8ICFzYWZlKSBkYXRhID0gZGF0YVtwYXJ0c1tpbmRleCsrXV1cbiAgICAgICAgICBlbHNlIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICB9KVxuICAgIClcbiAgfSxcblxuICBqb2luOiBmdW5jdGlvbiAoc2VnbWVudHMpIHtcbiAgICByZXR1cm4gc2VnbWVudHMucmVkdWNlKGZ1bmN0aW9uIChwYXRoLCBwYXJ0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBwYXRoICtcbiAgICAgICAgKGlzUXVvdGVkKHBhcnQpIHx8IERJR0lUX1JFR0VYLnRlc3QocGFydClcbiAgICAgICAgICA/ICdbJyArIHBhcnQgKyAnXSdcbiAgICAgICAgICA6IChwYXRoID8gJy4nIDogJycpICsgcGFydClcbiAgICAgIClcbiAgICB9LCAnJylcbiAgfSxcblxuICBmb3JFYWNoOiBmdW5jdGlvbiAocGF0aCwgY2IsIHRoaXNBcmcpIHtcbiAgICBmb3JFYWNoKEFycmF5LmlzQXJyYXkocGF0aCkgPyBwYXRoIDogc3BsaXQocGF0aCksIGNiLCB0aGlzQXJnKVxuICB9LFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVQYXRoKHBhdGgpIHtcbiAgcmV0dXJuIChcbiAgICBwYXRoQ2FjaGUuZ2V0KHBhdGgpIHx8XG4gICAgcGF0aENhY2hlLnNldChcbiAgICAgIHBhdGgsXG4gICAgICBzcGxpdChwYXRoKS5tYXAoZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgcmV0dXJuIHBhcnQucmVwbGFjZShDTEVBTl9RVU9URVNfUkVHRVgsICckMicpXG4gICAgICB9KVxuICAgIClcbiAgKVxufVxuXG5mdW5jdGlvbiBzcGxpdChwYXRoKSB7XG4gIHJldHVybiBwYXRoLm1hdGNoKFNQTElUX1JFR0VYKSB8fCBbJyddXG59XG5cbmZ1bmN0aW9uIGZvckVhY2gocGFydHMsIGl0ZXIsIHRoaXNBcmcpIHtcbiAgdmFyIGxlbiA9IHBhcnRzLmxlbmd0aCxcbiAgICBwYXJ0LFxuICAgIGlkeCxcbiAgICBpc0FycmF5LFxuICAgIGlzQnJhY2tldFxuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbGVuOyBpZHgrKykge1xuICAgIHBhcnQgPSBwYXJ0c1tpZHhdXG5cbiAgICBpZiAocGFydCkge1xuICAgICAgaWYgKHNob3VsZEJlUXVvdGVkKHBhcnQpKSB7XG4gICAgICAgIHBhcnQgPSAnXCInICsgcGFydCArICdcIidcbiAgICAgIH1cblxuICAgICAgaXNCcmFja2V0ID0gaXNRdW90ZWQocGFydClcbiAgICAgIGlzQXJyYXkgPSAhaXNCcmFja2V0ICYmIC9eXFxkKyQvLnRlc3QocGFydClcblxuICAgICAgaXRlci5jYWxsKHRoaXNBcmcsIHBhcnQsIGlzQnJhY2tldCwgaXNBcnJheSwgaWR4LCBwYXJ0cylcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNRdW90ZWQoc3RyKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyICYmIFtcIidcIiwgJ1wiJ10uaW5kZXhPZihzdHIuY2hhckF0KDApKSAhPT0gLTFcbiAgKVxufVxuXG5mdW5jdGlvbiBoYXNMZWFkaW5nTnVtYmVyKHBhcnQpIHtcbiAgcmV0dXJuIHBhcnQubWF0Y2goTEVBRF9ESUdJVF9SRUdFWCkgJiYgIXBhcnQubWF0Y2goRElHSVRfUkVHRVgpXG59XG5cbmZ1bmN0aW9uIGhhc1NwZWNpYWxDaGFycyhwYXJ0KSB7XG4gIHJldHVybiBTUEVDX0NIQVJfUkVHRVgudGVzdChwYXJ0KVxufVxuXG5mdW5jdGlvbiBzaG91bGRCZVF1b3RlZChwYXJ0KSB7XG4gIHJldHVybiAhaXNRdW90ZWQocGFydCkgJiYgKGhhc0xlYWRpbmdOdW1iZXIocGFydCkgfHwgaGFzU3BlY2lhbENoYXJzKHBhcnQpKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/property-expr/index.js\n");

/***/ })

};
;